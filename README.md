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

## 📸 Screenshots

*Note: Add screenshots of your application here showing:*

- Dashboard with expense overview
- Add Expense form with split options
- Balance view with settlement suggestions
- Analytics page with spending breakdown

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

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you encounter any issues or have questions, please create an issue in the repository.

---

**Built with ❤️ by ~Aaditya Hasabnis (VIIT) Computer Engineer**  
[Resume Link 👈🏻](https://drive.google.com/file/d/1C-K2_uOi1GOMG5peOuFWL0IMf63DBlwV/view)