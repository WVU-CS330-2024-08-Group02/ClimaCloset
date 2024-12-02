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

/**
 * Registers a new user by hashing the password and storing user data in the database.
 * @route POST /auth/register
 * @param {string} username - The username of the user.
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user (will be hashed before storing).
 * @param {string} name - The name of the user.
 * @returns {JSON} Success message or error message.
 */
router.post('/register', async (req, res) => {
  const { username, email, password, name} = req.body;
  const hashedPassword = await bcrypt.hash(password, 10); // Hashing the password for security

  try {
    const pool = await sql.connect();
    await pool.request()
      .input('username', sql.NVarChar, username)
      .input('email', sql.NVarChar, email)
      .input('password', sql.NVarChar, hashedPassword)
      .input('name', sql.NVarChar, name)
      .query('INSERT INTO users (username ,email ,password, name) VALUES (@username, @email, @password, @name)');
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({ error: 'Failed to register user' });
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

    // Check if user exists and password matches
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      // Set JWT in HttpOnly cookie for secure storage
      res.cookie('token', token, { httpOnly: true, sameSite: 'strict' });
      res.json({ message: 'Login successful' });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: 'Failed to login' });
  }
});

module.exports = router;