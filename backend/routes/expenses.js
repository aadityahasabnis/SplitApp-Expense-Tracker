import express from 'express';
import Expense from '../models/Expense.js';
import { validateExpenseCreate, validateExpenseUpdate } from '../middleware/validation.js';

const router = express.Router();

// GET /expenses - List all expenses
router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: -1 });
    res.json({
      success: true,
      data: expenses,
      message: 'Expenses retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving expenses',
      error: error.message
    });
  }
});

// POST /expenses - Add new expense
router.post('/', validateExpenseCreate, async (req, res) => {
  try {
    const { amount, description, paid_by, participants, category, isRecurring, recurringFrequency } = req.body;
    
    // If no participants specified, create equal split with payer
    let finalParticipants = participants;
    if (!participants || participants.length === 0) {
      finalParticipants = [{ name: paid_by, shareType: 'equal', share: 1 }];
    }
    
    const expense = new Expense({
      amount,
      description,
      paid_by,
      participants: finalParticipants,
      category: category || 'Other',
      isRecurring: isRecurring || false,
      recurringFrequency
    });
    
    await expense.save();
    
    res.status(201).json({
      success: true,
      data: expense,
      message: 'Expense added successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error adding expense',
      error: error.message
    });
  }
});

// PUT /expenses/:id - Update expense
router.put('/:id', validateExpenseUpdate, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const expense = await Expense.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true
    });
    
    if (!expense) {
      return res.status(404).json({
        success: false,
        message: 'Expense not found'
      });
    }
    
    res.json({
      success: true,
      data: expense,
      message: 'Expense updated successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating expense',
      error: error.message
    });
  }
});

// DELETE /expenses/:id - Delete expense
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const expense = await Expense.findByIdAndDelete(id);
    
    if (!expense) {
      return res.status(404).json({
        success: false,
        message: 'Expense not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Expense deleted successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error deleting expense',
      error: error.message
    });
  }
});

// GET /expenses/categories - Get expense categories summary
router.get('/categories', async (req, res) => {
  try {
    const categoryStats = await Expense.aggregate([
      {
        $group: {
          _id: '$category',
          totalAmount: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { totalAmount: -1 }
      }
    ]);
    
    res.json({
      success: true,
      data: categoryStats,
      message: 'Category statistics retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving category statistics',
      error: error.message
    });
  }
});

export default router;