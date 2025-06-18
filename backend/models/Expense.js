import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
    min: [0.01, 'Amount must be positive']
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: [200, 'Description cannot exceed 200 characters']
  },
  paid_by: {
    type: String,
    required: true,
    trim: true
  },
  participants: [{
    name: {
      type: String,
      required: true
    },
    share: {
      type: Number,
      required: true,
      min: 0
    },
    shareType: {
      type: String,
      enum: ['equal', 'percentage', 'exact'],
      default: 'equal'
    }
  }],
  category: {
    type: String,
    enum: ['Food', 'Travel', 'Utilities', 'Entertainment', 'Shopping', 'Other'],
    default: 'Other'
  },
  date: {
    type: Date,
    default: Date.now
  },
  isRecurring: {
    type: Boolean,
    default: false
  },
  recurringFrequency: {
    type: String,
    enum: ['weekly', 'monthly', 'yearly'],
    required: function () { return this.isRecurring; }
  },
  isSettlement: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Virtual for calculating individual shares
expenseSchema.virtual('calculatedShares').get(function () {
  if (this.participants.length === 0) return [];

  const totalAmount = this.amount;
  const shares = [];

  // Calculate shares based on type
  for (const participant of this.participants) {
    let shareAmount = 0;

    switch (participant.shareType) {
      case 'equal':
        shareAmount = totalAmount / this.participants.length;
        break;
      case 'percentage':
        shareAmount = (totalAmount * participant.share) / 100;
        break;
      case 'exact':
        shareAmount = participant.share;
        break;
    }

    shares.push({
      name: participant.name,
      amount: Math.round(shareAmount * 100) / 100
    });
  }

  return shares;
});

export default mongoose.model('Expense', expenseSchema);