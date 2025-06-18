# SplitApp - Smart Expense Tracker

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen?logo=mongodb)
![Tailwind](https://img.shields.io/badge/CSS-Tailwind-blue?logo=tailwindcss)

A full-stack expense splitting application built with React and Express.js that helps groups manage shared expenses with smart settlement calculations.

## 🌐 Live Demo

| Service | URL | Description |
|---------|-----|-------------|
| **Frontend** | [splitappexpensetracker.vercel.app](https://splitappexpensetracker.vercel.app) | Live React application |
| **Backend API** | [splitapp-expense-tracker.onrender.com](https://splitapp-expense-tracker.onrender.com) | REST API endpoints |
| **API Testing** | [Postman Workspace](https://www.postman.com/aadityahasabnis/splitapp-postman-api-testing) | Ready-to-use API collection |

## Features

### ✨ Core Features

- **Add Expenses**: Track group expenses with detailed information
- **Smart Splitting**: Support for equal splits and percentage-based splits
- **Balance Calculation**: Automatic calculation of who owes whom
- **Settlement Optimization**: Minimizes the number of transactions needed
- **Category Management**: Organize expenses by categories
- **Recurring Expenses**: Set up weekly, monthly, or yearly recurring expenses
- **Indian Rupee Support**: All amounts displayed in ₹ (INR) currency

### 📊 Analytics & Insights

- **Dashboard Overview**: Quick summary of all expenses and balances
- **Category Breakdown**: Visual representation of spending by category
- **Monthly Trends**: Track spending patterns over time
- **Top Spenders**: See who's contributing the most to group expenses

### 🎯 Advanced Split Options

- **Equal Split**: Divide expenses equally among all participants
- **Percentage Split**: Set custom percentages for each participant
- **Flexible Participants**: Add anyone to split specific expenses

## Tech Stack

### Frontend

- **React 18** - Modern React with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **Vite** - Fast build tool and development server

### Backend

- **Express.js** - Web application framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **CORS** - Cross-origin resource sharing
- **Body Parser** - Request body parsing middleware

## Project Structure

```text
project/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── Dashboard.jsx
│   │   │   ├── ExpenseForm.jsx
│   │   │   ├── ExpenseList.jsx
│   │   │   ├── BalanceView.jsx
│   │   │   ├── Analytics.jsx
│   │   │   ├── Header.jsx
│   │   │   └── Navigation.jsx
│   │   ├── context/          # State management
│   │   │   └── AppContext.jsx
│   │   ├── App.jsx           # Main app component
│   │   └── main.jsx          # App entry point
│   ├── package.json
│   └── vite.config.js
├── backend/                  # Express.js API
│   ├── models/               # MongoDB models
│   │   └── Expense.js
│   ├── routes/               # API routes
│   │   ├── expenses.js
│   │   └── settlements.js
│   ├── middleware/           # Custom middleware
│   │   └── validation.js
│   ├── server.js             # Server entry point
│   └── package.json
└── package.json              # Root package.json
```

## Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account or local MongoDB installation

### 1. Clone and Install Dependencies

```bash
# Clone the repository
git clone https://github.com/aadityahasabnis/SplitApp-Expense-Tracker.git
cd SplitApp-Expense-Tracker

# Install all dependencies (root, frontend, and backend)
npm run install-deps
```

### 2. Environment Setup

Create a `.env` file in the backend directory:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/splitapp
PORT=5000
```

### 3. Development Mode

```bash
# Run both frontend and backend concurrently (on root directory)
npm run dev 

# Or run separately:
npm start  # Backend only (port 5000)
npm run dev  # Frontend only (port 5173)
```



## API Endpoints

### Expenses

- `GET /api/expenses` - Get all expenses
- `POST /api/expenses` - Create new expense
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense
- `GET /api/expenses/categories` - Get category statistics

### Settlements

- `GET /api/settlements` - Get settlement suggestions
- `GET /api/settlements/balances` - Get individual balances
- `GET /api/settlements/people` - Get all people from expenses

## Usage Guide

### Adding an Expense

1. Navigate to the "Add Expense" tab
2. Fill in the expense details:
   - Amount and description (required)
   - Who paid for it (required)
   - Category selection
   - Optional recurring settings
3. Choose split method:
   - **Equal Split**: Divides amount equally among all participants
   - **Percentage Split**: Set custom percentages (must total 100%)
4. Add participants who should split the expense
5. Submit the expense

### Understanding Balances

- **Green amounts**: Person is owed money
- **Red amounts**: Person owes money
- **Gray amounts**: All settled up

### Settlement Suggestions

The app automatically calculates the minimum number of transactions needed to settle all debts efficiently.

## 🧮 Settlement Calculation Logic

### How Balance Calculation Works

The application uses a sophisticated algorithm to calculate who owes whom and determines the optimal settlement transactions:

#### 1. **Balance Calculation Process**

```text
For each expense:
1. Add the full amount to the payer's balance (positive)
2. Subtract each participant's share from their balance (negative)
3. Calculate shares based on split type:
   - Equal Split: amount ÷ number of participants
   - Percentage Split: (amount × percentage) ÷ 100
   - Exact Split: predefined exact amounts
```

#### 2. **Settlement Optimization Algorithm**

The app implements a **Greedy Settlement Algorithm** that minimizes transactions:

```text
1. Separate people into two groups:
   - Creditors: People who are owed money (positive balance)
   - Debtors: People who owe money (negative balance)

2. Match debtors with creditors optimally:
   - Take the largest debt and largest credit
   - Create a settlement for the minimum of these two amounts
   - Update balances and continue until all settled

3. Result: Minimum number of transactions needed
```

#### 3. **Example Calculation**

**Scenario**: 3 friends go to dinner

```text
Expense: ₹3000 dinner paid by Alice, split equally among Alice, Bob, Charlie

Step 1 - Initial Balances:
- Alice: +₹3000 (paid) - ₹1000 (share) = +₹2000 (is owed)
- Bob: ₹0 (paid) - ₹1000 (share) = -₹1000 (owes)
- Charlie: ₹0 (paid) - ₹1000 (share) = -₹1000 (owes)

Step 2 - Settlement Optimization:
Instead of:
- Bob pays Alice ₹1000
- Charlie pays Alice ₹1000
Total: 2 transactions

Optimized result:
- Bob pays Alice ₹1000
- Charlie pays Alice ₹1000
Total: 2 transactions (same in this case)
```

**Complex Scenario**: Multiple expenses with different payers

```text
Expenses:
1. ₹1200 lunch paid by Alice, split equally (Alice, Bob, Charlie)
2. ₹900 movie paid by Bob, split equally (Alice, Bob, Charlie)
3. ₹600 snacks paid by Charlie, split equally (Alice, Bob, Charlie)

Balances:
- Alice: +₹1200 - ₹400 - ₹300 - ₹200 = +₹300
- Bob: +₹900 - ₹400 - ₹300 - ₹200 = ₹0
- Charlie: +₹600 - ₹400 - ₹300 - ₹200 = -₹300

Settlement:
- Charlie pays Alice ₹300
Total: 1 transaction (instead of multiple complex payments)
```

#### 4. **Algorithm Benefits**

- **Minimized Transactions**: Reduces complex web of payments to simplest form
- **Fair Settlement**: Ensures everyone pays exactly their share
- **Real-time Updates**: Recalculates automatically when new expenses are added
- **Multiple Split Types**: Handles equal, percentage, and exact splits seamlessly

### 5. **Technical Implementation**

The settlement logic is implemented in `/backend/routes/settlements.js`:

- **`calculateBalances()`**: Processes all expenses to determine individual balances
- **`calculateSettlements()`**: Applies the greedy algorithm for optimal settlements
- **Real-time Processing**: Calculations happen on every API call for up-to-date results

**API Endpoints for Settlement:**

- `GET /api/settlements/balances` - Returns individual balances with status
- `GET /api/settlements` - Returns optimized settlement suggestions

## 📸 Screenshots

- Dashboard with expense overview
![Dashboard with expense overview](./screenshots/image.png)

- Add Expense form with split options
![Add Expense form with split options](./screenshots/image-1.png)

- Balance view with settlement suggestions
![Balance view with settlement suggestions](./screenshots/image-2.png)

- Analytics page with spending breakdown
![Analytics page with spending breakdown](./screenshots/image-3.png)

## 🚀 Deployment

This project is deployed on:

- **Frontend**: Vercel (React SPA)
- **Backend**: Render.com (Node.js/Express API)
- **Database**: MongoDB Atlas (Cloud Database)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Support

If you encounter any issues or have questions, please create an issue in the repository.

---

**Built with ❤️ by ~Aaditya Hasabnis (VIIT) Computer Engineer**  
[Resume Link 👈🏻](https://drive.google.com/file/d/1wfwMiEbK6u0jJOk7-pzn5Z9USP9i9BPi/view)