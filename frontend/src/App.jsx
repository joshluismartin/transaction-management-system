import { useState, useEffect } from 'react';
import TransactionTable from './components/TransactionTable';
import AddTransactionModal from './components/AddTransactionModal';
import { getTransactions } from './services/api';

function App() {
	const [transactions, setTransactions] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState('');

	// Fetch transactions on component mount
	useEffect(() => {
		fetchTransactions();
	}, []);

	const fetchTransactions = async () => {
		try {
			setIsLoading(true);
			setError('');
			const data = await getTransactions();
			setTransactions(data);
		} catch (err) {
			setError('Failed to load transactions. Please refresh the page.');
			console.error('Error fetching transactions:', err);
		} finally {
			setIsLoading(false);
		}
	};

	const handleTransactionAdded = (newTransaction) => {
		setTransactions(prev => [...prev, newTransaction]);
	};

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Header */}
			<header className="bg-white shadow-sm">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
					<div className="flex justify-between items-center">
						<h1 className="text-3xl font-bold text-gray-900">
							Transaction Management System
						</h1>
						<button
							onClick={() => setIsModalOpen(true)}
							className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
						>
							Add Transaction
						</button>
					</div>
				</div>
			</header>

			{/* Main Content */}
			<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{error && (
					<div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
						<p className="text-sm text-red-600">{error}</p>
					</div>
				)}

				{isLoading ? (
					<div className="flex justify-center items-center py-12">
						<div className="text-gray-500">Loading transactions...</div>
					</div>
				) : transactions.length === 0 ? (
					<div className="text-center py-12">
						<p className="text-gray-500 text-lg">No transactions yet.</p>
						<p className="text-gray-400 mt-2">Click "Add Transaction" to create your first one.</p>
					</div>
				) : (
					<TransactionTable transactions={transactions} />
				)}
			</main>

			{/* Modal */}
			<AddTransactionModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onTransactionAdded={handleTransactionAdded}
			/>
		</div>
	);
}

export default App;
