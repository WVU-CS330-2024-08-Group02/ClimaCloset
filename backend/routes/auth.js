/**
 * auth.js
 * 
 * This file defines routes for user registration and login. It handles authentication 
 * by hashing passwords with bcrypt during registration and generating JWTs upon login.
 */

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sql } = require('../config'); // Importing database configuration and connection
const router = express.Router();
const axios = require('axios');

// Figure out how to move route to weatherData.js
router.get('/Weather', async (req, res) => {
  try {
      const ipAddress = (await axios.get('http://api.ipify.org')).data;
      const geoData = (await axios.get(`http://ip-api.com/json/${ipAddress}`)).data;
      const { lat, lon } = geoData;

      const gridpoints = (await axios.get(`https://api.weather.gov/points/${lat},${lon}`)).data;
      const { gridId: office, gridX, gridY } = gridpoints.properties;

      // Fetch hourly forecast
      const forecastHourly = (await axios.get(`https://api.weather.gov/gridpoints/${office}/${gridX},${gridY}/forecast/hourly`)).data;
      const forecastHourlyData = forecastHourly.properties.periods.slice(0, 12).map((period) => ({
          time: period.name,
          temperature: `${period.temperature}&degF`,
          shortForecast: period.shortForecast,
          icon: period.icon
      }));

      // Log hourly forecast data
      console.log("Hourly Forecast Data:", forecastHourlyData);

      // Fetch daily forecast
      const forecastDaily = (await axios.get(`https://api.weather.gov/gridpoints/${office}/${gridX},${gridY}/forecast`)).data;
      const forecastDailyData = forecastDaily.properties.periods.slice(0, 7).map((period) => ({
          time: period.name,
          temperature: `${period.temperature}&degF`,
          shortForecast: period.shortForecast,
          icon: period.icon
      }));

      // Log daily forecast data
      console.log("Daily Forecast Data:", forecastDailyData);

      const weatherData = {
          geoData,
          forecastHourly: forecastHourlyData,
          forecastDaily: forecastDailyData
      };

      res.json(weatherData);
  } catch (error) {
      console.error("Error in /auth/Weather:", error.message);
      res.status(500).json({ error: "Failed to fetch weather data", details: error.message });
  }
});

/**
 * Authenticates a user by verifying the password and generates a JWT for session management.
 * @route POST /auth/login
 * @param {string} username - The username of the user.
 * @param {string} password - The password of the user (plain text).
 * @returns {JSON} Success message with JWT cookie or error message.
 */
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const pool = await sql.connect();
    const result = await pool.request()
      .input('username', sql.NVarChar, username)
      .query('SELECT * FROM users WHERE username = @username');
    const user = result.recordset[0];

    // Log the login attempt and user info for debugging
    console.log(`Login attempt: ${username} ${password}`);
    if (user) {
      console.log(`User from DB: ${user.username} ${user.password}`);
    }

    // Check if user exists and password matches
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      
      // Set JWT in HttpOnly cookie for secure storage
      res.cookie('token', token, { httpOnly: true, sameSite: 'strict' });

      // Include user details in the response
      res.json({
        message: 'Login successful',
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          name: user.name
        }
      });
    } else {
      console.log(`Invalid credentials for user: ${username}`);
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: 'Failed to login' });
  }
});

// Register user
router.post('/register', async (req, res) => {
  const { username, email, password, name } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const pool = await sql.connect();
    await pool.request()
      .input('username', sql.NVarChar, username)
      .input('email', sql.NVarChar, email)
      .input('password', sql.NVarChar, hashedPassword)
      .input('name', sql.NVarChar, name)
      .query('INSERT INTO users (username, email, password, name) VALUES (@username, @email, @password, @name)');

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
});

module.exports = router;