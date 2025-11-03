function TransactionTable({ transactions }) {
	// Function to determine status badge color
	const getStatusColor = (status) => {
		switch (status) {
			case 'Pending':
				return 'bg-yellow-100 text-yellow-800';
			case 'Settled':
				return 'bg-green-100 text-green-800';
			case 'Failed':
				return 'bg-red-100 text-red-800';
			default:
				return 'bg-gray-100 text-gray-800';
		}
	};

	return (
		<div className="overflow-x-auto shadow-md rounded-lg">
			<table className="min-w-full bg-white">
				<thead className="bg-gray-100 border-b">
					<tr>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
							Transaction Date
						</th>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
							Account Number
						</th>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
							Account Holder Name
						</th>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
							Amount
						</th>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
							Status
						</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-gray-200">
					{transactions.map((transaction, index) => (
						<tr key={index} className="hover:bg-gray-50 transition-colors">
							<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
								{transaction.transaction_date}
							</td>
							<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
								{transaction.account_number}
							</td>
							<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
								{transaction.account_holder_name}
							</td>
							<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
								${parseFloat(transaction.amount).toFixed(2)}
							</td>
							<td className="px-6 py-4 whitespace-nowrap">
								<span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(transaction.status)}`}>
									{transaction.status}
								</span>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default TransactionTable;
