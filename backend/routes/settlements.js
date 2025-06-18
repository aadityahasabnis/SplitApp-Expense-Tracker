import express from 'express';
import Expense from '../models/Expense.js';

const router = express.Router();

// GET /settlements - Get settlement summary
router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find();
    const settlements = calculateSettlements(expenses);

    res.json({
      success: true,
      data: settlements,
      message: 'Settlements calculated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error calculating settlements',
      error: error.message
    });
  }
});

// GET /balances - Get individual balances
router.get('/balances', async (req, res) => {
  try {
    const expenses = await Expense.find();
    const balances = calculateBalances(expenses);

    res.json({
      success: true,
      data: balances,
      message: 'Balances calculated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error calculating balances',
      error: error.message
    });
  }
});

// GET /people - Get all people from expenses
router.get('/people', async (req, res) => {
  try {
    const expenses = await Expense.find();
    const people = getAllPeople(expenses);

    res.json({
      success: true,
      data: people,
      message: 'People list retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving people',
      error: error.message
    });
  }
});

// Helper function to calculate balances
function calculateBalances(expenses) {
  const balances = {};

  expenses.forEach(expense => {
    const { amount, paid_by, participants } = expense;

    // Initialize balances
    if (!balances[paid_by]) balances[paid_by] = 0;

    // Add paid amount
    balances[paid_by] += amount;

    // Calculate and subtract shares
    participants.forEach(participant => {
      if (!balances[participant.name]) balances[participant.name] = 0;

      let shareAmount = 0;

      // Calculate share amount based on shareType
      if (participant.shareType === 'percentage') {
        shareAmount = (amount * participant.share) / 100;
      } else if (participant.shareType === 'exact') {
        shareAmount = participant.share;
      } else { // equal split
        shareAmount = participants.length > 0 ? amount / participants.length : amount;
      }

      balances[participant.name] -= shareAmount;
    });

    // If no participants, payer owes themselves
    if (participants.length === 0) {
      balances[paid_by] -= amount;
    }
  });

  return Object.entries(balances).map(([name, balance]) => ({
    name,
    balance: Math.round(balance * 100) / 100,
    status: balance > 0 ? 'owed' : balance < 0 ? 'owes' : 'settled'
  }));
}

// Helper function to calculate optimal settlements
function calculateSettlements(expenses) {
  const balances = calculateBalances(expenses);
  const settlements = [];

  // Separate debtors and creditors
  const debtors = balances.filter(b => b.balance < 0);
  const creditors = balances.filter(b => b.balance > 0);

  // Create settlement transactions
  let i = 0, j = 0;
  while (i < debtors.length && j < creditors.length) {
    const debt = Math.abs(debtors[i].balance);
    const credit = creditors[j].balance;
    const amount = Math.min(debt, credit);

    if (amount > 0.01) { // Only include meaningful amounts
      settlements.push({
        from: debtors[i].name,
        to: creditors[j].name,
        amount: Math.round(amount * 100) / 100
      });
    }

    debtors[i].balance += amount;
    creditors[j].balance -= amount;

    if (Math.abs(debtors[i].balance) < 0.01) i++;
    if (Math.abs(creditors[j].balance) < 0.01) j++;
  }

  return settlements;
}

// Helper function to get all people
function getAllPeople(expenses) {
  const peopleSet = new Set();

  expenses.forEach(expense => {
    peopleSet.add(expense.paid_by);
    expense.participants.forEach(participant => {
      peopleSet.add(participant.name);
    });
  });

  return Array.from(peopleSet).map(name => ({ name }));
}

export default router;