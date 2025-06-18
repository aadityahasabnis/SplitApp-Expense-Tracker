# SplitApp - Smart Expense Tracker

A full-stack expense splitting application built with React and Express.js that helps groups manage shared expenses with smart settlement calculations.

## Features

### ✨ Core Features
- **Add Expenses**: Track group expenses with detailed information
- **Smart Splitting**: Support for equal splits and percentage-based splits
- **Balance Calculation**: Automatic calculation of who owes whom
- **Settlement Optimization**: Minimizes the number of transactions needed
- **Category Management**: Organize expenses by categories
- **Recurring Expenses**: Set up weekly, monthly, or yearly recurring expenses

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

```
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
git clone <repository-url>
cd project-bolt-expense-tracker/project

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
# Run both frontend and backend concurrently
npm run dev

# Or run separately:
npm run server  # Backend only (port 5000)
npm run client  # Frontend only (port 5173)
```

### 4. Production Build

```bash
# Build frontend for production
npm run build

# Start production server
npm start
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