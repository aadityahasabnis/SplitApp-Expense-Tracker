import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import expenseRoutes from './routes/expenses.js';
import settlementRoutes from './routes/settlements.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/expenses', expenseRoutes);
app.use('/api/settlements', settlementRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Server is running!' });
});

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI environment variable is not set!');
}

// Start server with or without MongoDB connection
const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`🌐 Frontend should connect to Backend URL: http://localhost:${PORT}`);
  });
};

// Attempt MongoDB connection with better error handling
if (MONGODB_URI) {
  mongoose.connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
  })
    .then(() => {
      console.log('✅ Connected to MongoDB');
      startServer();
    })
    .catch((error) => {
      console.error('❌ MongoDB connection error:', error.message);
      startServer();
    });
} else {
  console.log('\n⚠️  No MongoDB URI provided. Starting server without database...');
  startServer();
}

export default app;