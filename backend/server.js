const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const employeeRoutes = require('./routes/employeeRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // Allow Cross-Origin requests

// MongoDB Connection
const DB_PASSWORD = process.env.DB_PASSWORD || 'Budhiraja1807';
const MONGODB_URI = `mongodb+srv://NeerajKumar:${DB_PASSWORD}@cluster0.z71bo.mongodb.net/comp3123_assignment1?retryWrites=true&w=majority&appName=Cluster0`;

// Enable detailed Mongoose debug logs in development mode
if (process.env.NODE_ENV !== 'production') {
    mongoose.set('debug', true);
}

// Connect to MongoDB Atlas
mongoose
    .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((err) => {
        console.error('Error connecting to MongoDB Atlas:', err.message);
        process.exit(1); // Exit process on DB connection failure
    });

// MongoDB Connection Events
mongoose.connection.on('connected', () => console.log('Mongoose connected to DB'));
mongoose.connection.on('error', (err) => console.error('Mongoose connection error:', err));
mongoose.connection.on('disconnected', () => console.log('Mongoose disconnected'));

// API Routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/emp', employeeRoutes);

// 404 Route Handler
app.use((req, res) => res.status(404).json({ message: 'Route not found' }));

// Global Error Handler
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'production' ? 'An error occurred' : err.message,
    });
});

// Home Route
app.get('/', (req, res) => {
    res.send('<h1>Welcome</h1><p>Welcome to the Home Page of My Vercel Deployment</p>');
});

// Server Initialization
const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

// Graceful Shutdown for Unhandled Errors and Termination Signals
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err.message);
    server.close(() => process.exit(1));
});

process.on('SIGTERM', () => {
    console.log('SIGTERM received: shutting down gracefully');
    server.close(() => console.log('Process terminated'));
});

// Cleanup on Exit
process.on('SIGINT', async () => {
    console.log('SIGINT received: closing MongoDB connection...');
    await mongoose.connection.close();
    process.exit(0);
});
