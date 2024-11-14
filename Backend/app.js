// backend/app.js
const express = require('express');
const cors = require('cors');
const morgan = require('morgan'); // For logging requests
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // Import MongoDB connection function
const authRoutes = require('./routes/authRoutes'); // Import authentication routes
const carRoutes = require('./routes/carRoutes'); // Import car management routes

dotenv.config(); // Load environment variables

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse incoming JSON requests
app.use(morgan('dev')); // Log HTTP requests to the console

// Static Files Middleware
// Serve static files from the "uploads" directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/cars', carRoutes); // Car management routes

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'An internal server error occurred' });
});

module.exports = app;
