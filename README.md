# Transaction Management System

A full-stack web application for managing financial transactions with a Rails API backend and React frontend.

## Overview

This application allows users to view and create financial transactions. Transaction data is stored in a CSV file, and the system provides a clean, modern interface for managing transaction records.

## Features

- **View Transactions**: Display all transactions in a responsive table
- **Add Transactions**: Create new transactions via an accessible modal form
- **Color-Coded Status**: Visual status indicators (Pending, Settled, Failed)
- **Data Persistence**: CSV-based storage for transaction records
- **RESTful API**: Clean API architecture following REST principles
- **Responsive Design**: Works on desktop and mobile devices

## Technology Stack

### Backend
- **Ruby on Rails 7.1** - API framework
- **Ruby 3.3.1** - Programming language
- **CSV** - Data storage
- **Rack CORS** - Cross-origin resource sharing

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Headless UI** - Accessible components
- **Axios** - HTTP client

## Project Structure


## Getting Started

### Prerequisites

- Ruby 3.3.1
- Node.js 18+ and npm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/joshluismartin/transaction-management-system.git
   cd transaction-management-system
   ```

2. **Setup Backend**
    ```bash
    cd backend
    bundle install
    ```

3. **Setup Frontend**
    ```bash
    cd frontend
    npm install
    ```

### Running the Application
You need to run both servers simultaneously.

1. Terminal 1 - Backend (Rails):
    ```bash
    cd backend
    rails server
    ```

    Rails will run on http://localhost:3000

2. Terminal 2 - Frontend (React):
    ```bash
    cd frontend
    npm run dev
    ```
    Vite will run on http://localhost:3001

### Access the application

Open your browser to the URL shown in the Vite terminal (typically http://localhost:3001)

## API Documentation

### Base URL

```http://localhost:3000```


### Endpoints

#### Get All Transactions

GET /transactions

If Response (200 OK):

```bash
[
  {
    "transaction_date": "2025-03-01",
    "account_number": "7289-3445-1121",
    "account_holder_name": "Maria Garcia",
    "amount": "150.00",
    "status": "Settled"
  }
]
```

#### Create Transaction

POST /transactions

Request Body:

```bash
{
  "transaction_date": "2025-03-15",
  "account_number": "1234-5678-9012",
  "account_holder_name": "John Doe",
  "amount": "100.00"
}
```

If Response (201 Created):

```bash
{
  "transaction_date": "2025-03-15",
  "account_number": "1234-5678-9012",
  "account_holder_name": "John Doe",
  "amount": "100.00",
  "status": "Pending"
}
```

Note: Status is randomly assigned by the backend (Pending, Settled, or Failed)


## Features Explained

### Transaction Table
- Displays all transactions in a clean, sortable table
- Color-coded status badges:
  - 🟡 Yellow = Pending
  - 🟢 Green = Settled
  - 🔴 Red = Failed
- Hover effects for better UX
- Responsive design with horizontal scroll on mobile

### Add Transaction Modal
- Accessible modal using Headless UI
- Form validation (all fields required)
- Loading state during submission
- Error handling with user feedback
- Keyboard accessible (Escape to close)
- Click outside to close

### Data Storage
- Transactions stored in `backend/db/transactions.csv`
- CSV format for simplicity and portability
- Automatic status assignment on creation

## Testing

### Test Adding a Transaction

1. Click "Add Transaction"
2. Fill in the form:
   - Date: Select any date
   - Account Number: `9999-8888-7777`
   - Name: `Test User`
   - Amount: `500.00`
3. Click "Add Transaction"
4. Verify transaction appears in table
5. Refresh page and verify it's still there

## Troubleshooting

### "Network Error" in browser console

**Cause:** CORS not configured or Rails server not running

**Solution:**
1. Verify Rails is running on port 3000
2. Check `backend/config/initializers/cors.rb` includes your frontend port
3. Restart Rails server after CORS changes

### Transactions not loading

**Cause:** CSV file missing or incorrect path

**Solution:**
1. Verify `backend/db/transactions.csv` exists
2. Check file has proper headers
3. Check Rails logs for errors


## Future Enhancements

- Edit existing transactions
- Delete transactions
- Search and filter functionality
- Pagination for large datasets
- Database integration (PostgreSQL/MySQL)
- User authentication
- Transaction categories
- Export to PDF/Excel
- Data visualization (charts/graphs)

## Development Notes

### Design Decisions

**Why CSV instead of a database?**
- Simplicity for a code test
- No database setup required
- Easy to inspect and debug
- Demonstrates file I/O handling

**Why separate frontend and backend?**
- Modern architecture pattern
- Clear separation of concerns
- Easier to scale and maintain
- Can deploy independently

**Why Tailwind CSS?**
- Rapid development
- Consistent design system
- Small production bundle
- No CSS file management

## Author

Joshua Luis B. Martin - (https://github.com/joshluismartin/transaction-management-system.git)
