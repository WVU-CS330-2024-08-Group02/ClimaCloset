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

    // Step 1: Retrieve user data from the database
    const userResult = await pool.request()
      .input('username', sql.NVarChar, username)
      .query('SELECT * FROM users WHERE username = @username');
    const user = userResult.recordset[0];

    if (!user || !(await bcrypt.compare(password, user.password))) {
      console.log(`Invalid credentials for user: ${username}`);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const userId = user.id;

    // Step 2: Check if the user already has a closet row
    const closetResult = await pool.request()
      .input('Id', sql.Int, userId)
      .query('SELECT COUNT(*) AS count FROM closet WHERE Id = @Id');
    
    const closetExists = closetResult.recordset[0].count > 0;

    // Step 3: Create a new closet row if it doesn't exist
    if (!closetExists) {
      await pool.request()
        .query(`
          INSERT INTO closet (Short_Sleeve, Long_Sleeve, Flannel, Tank_Top, Sweater, Sweatshirt, Jacket, Coat,
                              Jeans, Sweatpants, Dress_Pants, Shorts,
                              Tennis_Shoes, Boots, Flip_Flops, Sandals,
                              Sunglasses, Hat, Gloves, Scarf, Backpack, Purse, Umbrella)
          VALUES (0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
        `);
      console.log(`Closet created for user with ID: ${userId}`);
    }

    // Step 4: Generate a JWT and set it as a cookie
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true, sameSite: 'strict' });

    // Step 5: Return success response with user details
    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        name: user.name
      }
    });

  } catch (error) {
    console.error('Error during login:', error);
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

    // Step 1: Insert the user into the users table
    const userResult = await pool.request()
      .input('username', sql.NVarChar, username)
      .input('email', sql.NVarChar, email)
      .input('password', sql.NVarChar, hashedPassword)
      .input('name', sql.NVarChar, name)
      .query('INSERT INTO users (username, email, password, name) OUTPUT INSERTED.id AS userId');

    const userId = userResult.recordset[0].userId;

    // Step 2: Create a new row in the closet table for this user
    await pool.request()
      .query(`
        INSERT INTO closet (Short_Sleeve, Long_Sleeve, Flannel, Tank_Top, Sweater, Sweatshirt, Jacket, Coat,
                            Jeans, Sweatpants, Dress_Pants, Shorts,
                            Tennis_Shoes, Boots, Flip_Flops, Sandals,
                            Sunglasses, Hat, Gloves, Scarf, Backpack, Purse, Umbrella)
        VALUES (0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
      `);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
});

module.exports = router;
