import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { createTransaction } from '../services/api';

function AddTransactionModal({ isOpen, onClose, onTransactionAdded }) {
	const [formData, setFormData] = useState({
		transaction_date: '',
		account_number: '',
		account_holder_name: '',
		amount: ''
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState('');

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');
		setIsSubmitting(true);

		try {
			const newTransaction = await createTransaction(formData);
			onTransactionAdded(newTransaction);

			// Reset form
			setFormData({
				transaction_date: '',
				account_number: '',
				account_holder_name: '',
				amount: ''
			});

			onClose();
		} catch (err) {
			setError('Failed to create transaction. Please try again.');
			console.error('Error creating transaction:', err);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<Dialog open={isOpen} onClose={onClose} className="relative z-50">
			{/* Backdrop */}
			<div className="fixed inset-0 bg-black/30" aria-hidden="true" />

			{/* Full-screen container to center the panel */}
			<div className="fixed inset-0 flex items-center justify-center p-4">
				<Dialog.Panel className="mx-auto max-w-md w-full bg-white rounded-lg shadow-xl">
					{/* Modal Header */}
					<div className="px-6 py-4 border-b border-gray-200">
						<Dialog.Title className="text-xl font-semibold text-gray-900">
							Add New Transaction
						</Dialog.Title>
					</div>

					{/* Modal Body */}
					<form onSubmit={handleSubmit} className="px-6 py-4">
						{error && (
							<div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
								<p className="text-sm text-red-600">{error}</p>
							</div>
						)}

						{/* Transaction Date */}
						<div className="mb-4">
							<label htmlFor="transaction_date" className="block text-sm font-medium text-gray-700 mb-1">
								Transaction Date
							</label>
							<input
								type="date"
								id="transaction_date"
								name="transaction_date"
								value={formData.transaction_date}
								onChange={handleChange}
								required
								className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							/>
						</div>

						{/* Account Number */}
						<div className="mb-4">
							<label htmlFor="account_number" className="block text-sm font-medium text-gray-700 mb-1">
								Account Number
							</label>
							<input
								type="text"
								id="account_number"
								name="account_number"
								value={formData.account_number}
								onChange={handleChange}
								placeholder="1234-5678-9012"
								required
								className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							/>
						</div>

						{/* Account Holder Name */}
						<div className="mb-4">
							<label htmlFor="account_holder_name" className="block text-sm font-medium text-gray-700 mb-1">
								Account Holder Name
							</label>
							<input
								type="text"
								id="account_holder_name"
								name="account_holder_name"
								value={formData.account_holder_name}
								onChange={handleChange}
								placeholder="John Doe"
								required
								className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							/>
						</div>

						{/* Amount */}
						<div className="mb-6">
							<label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
								Amount
							</label>
							<input
								type="number"
								id="amount"
								name="amount"
								value={formData.amount}
								onChange={handleChange}
								placeholder="100.00"
								step="0.01"
								min="0"
								required
								className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							/>
						</div>

						{/* Modal Footer */}
						<div className="flex justify-end gap-3">
							<button
								type="button"
								onClick={onClose}
								disabled={isSubmitting}
								className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50"
							>
								Cancel
							</button>
							<button
								type="submit"
								disabled={isSubmitting}
								className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
							>
								{isSubmitting ? 'Adding...' : 'Add Transaction'}
							</button>
						</div>
					</form>
				</Dialog.Panel>
			</div>
		</Dialog>
	);
}

export default AddTransactionModal;
