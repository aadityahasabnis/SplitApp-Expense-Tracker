import validator from 'validator';

// Validation for creating new expense (all fields required)
export const validateExpenseCreate = (req, res, next) => {
  const { amount, description, paid_by } = req.body;
  const errors = [];
  
  // Validate amount
  if (!amount || typeof amount !== 'number' || amount <= 0) {
    errors.push('Amount must be a positive number');
  }
  
  // Validate description
  if (!description || typeof description !== 'string' || description.trim().length === 0) {
    errors.push('Description is required');
  } else if (description.length > 200) {
    errors.push('Description cannot exceed 200 characters');
  }
  
  // Validate paid_by
  if (!paid_by || typeof paid_by !== 'string' || paid_by.trim().length === 0) {
    errors.push('Paid by field is required');
  }
  
  // If there are validation errors, return them
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }
  
  next();
};

// Validation for updating expense (only validate provided fields)
export const validateExpenseUpdate = (req, res, next) => {
  const { amount, description, paid_by } = req.body;
  const errors = [];
  
  // Validate amount only if provided
  if (amount !== undefined) {
    if (typeof amount !== 'number' || amount <= 0) {
      errors.push('Amount must be a positive number');
    }
  }
  
  // Validate description only if provided
  if (description !== undefined) {
    if (typeof description !== 'string' || description.trim().length === 0) {
      errors.push('Description cannot be empty');
    } else if (description.length > 200) {
      errors.push('Description cannot exceed 200 characters');
    }
  }
  
  // Validate paid_by only if provided
  if (paid_by !== undefined) {
    if (typeof paid_by !== 'string' || paid_by.trim().length === 0) {
      errors.push('Paid by field cannot be empty');
    }
  }
  
  // If there are validation errors, return them
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }
  
  next();
};

// Legacy function for backward compatibility
export const validateExpense = validateExpenseCreate;