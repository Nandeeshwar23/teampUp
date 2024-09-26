
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth'); // Authentication routes
const profileRoutes = require('./routes/profile'); // Profile routes
require('dotenv').config(); // Load environment variables

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:3000' })); // Change to your frontend URL
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the process on error
  });

// Routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/profile', profileRoutes); // Profile routes

// Test Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Graceful shutdown
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('MongoDB disconnected on app termination');
    process.exit(0);
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
