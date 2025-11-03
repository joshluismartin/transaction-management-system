function App() {
	return (
		<div className="min-h-screen bg-gray-100 flex items-center justify-center">
			<div className="bg-white p-8 rounded-lg shadow-lg">
				<h1 className="text-3xl font-bold text-blue-600 mb-4">
					Tailwind CSS is Working! 🎉
				</h1>
				<p className="text-gray-600">
					If you see styled text, Tailwind is configured correctly.
				</p>
				<button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition-colors">
					Test Button
				</button>
			</div>
		</div>
	)
}

export default App
