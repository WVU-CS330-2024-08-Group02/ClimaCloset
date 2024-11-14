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
const stacRoutes = require('./routes/stac'); // Import STAC routes including temperature data

const app = express();
const PORT = process.env.PORT || 5000;

// Establish connection to the database
connectDB();

// Middleware setup
app.use(express.json()); // Parses incoming JSON requests
app.use(cookieParser()); // Parses cookies attached to the client request
app.use(cors({ origin: 'http://localhost:3000', credentials: true })); // Allows cross-origin requests from frontend

// Route setup
app.use('/auth', authRoutes); // Routes for user authentication
app.use('/api/temperature', stacRoutes); // Routes for STAC API access to planetary computer data

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));