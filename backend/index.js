/**
 * Main entry point for the backend. Sets up the Express server, 
 * establishes a connection to the database, and configures routes 
 * and middleware.
 */

require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { connectDB } = require('./config'); // Import function to connect to Azure SQL database
const authRoutes = require('./routes/auth'); // Import authentication routes
const weatherRoutes = require('./routes/weatherData'); // Weather routes

const app = express();
const PORT = process.env.PORT || 5001;

// Establish connection to the database
connectDB();

// Middleware setup
app.use(express.json()); // Parses incoming JSON requests
app.use(cookieParser()); // Parses cookies attached to the client request
app.use(cors({ origin: 'http://localhost:5173', credentials: true })); // Allows cross-origin requests from frontend

// Route setup
app.use('/auth', authRoutes); // Routes for user authentication
app.use('/weather', weatherRoutes); // Weather routes

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));