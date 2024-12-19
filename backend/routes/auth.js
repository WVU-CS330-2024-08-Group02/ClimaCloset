/**
 * This file defines routes for user registration and login. It handles 
 * authentication by hashing passwords with bcrypt during registration 
 * and generating JWTs upon login. 
 */

// Import libraries and modules 
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sql } = require('../config');
const router = express.Router();
const axios = require('axios');

// Login route for authenticating users
router.post('/login', async (req, res) => {
  // Get the username & password from request body
  const { username, password } = req.body;

  try {
    // Connect to database
    const pool = await sql.connect();

    // Retrieve user data
    const userResult = await pool.request()
      .input('username', sql.NVarChar, username)
      .query('SELECT * FROM users WHERE username = @username');
    const user = userResult.recordset[0];

    // Validate that user exists and passwords match
    if (!user || !(await bcrypt.compare(password, user.password))) {
      console.log(`Invalid credentials for user: ${username}`);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Extract user ID
    const userId = userResult.recordset[0].id;

    // Check if the user has a closet row stored in database
    const closetResult = await pool.request()
      .input('Id', sql.Int, userId)
      .query('SELECT COUNT(*) AS count FROM closet WHERE Id = @Id');
    
    // Create an object if user has a closet stored
    const closetExists = closetResult.recordset[0].count > 0;

    // Create a new closet row if it doesn't exist
    if (!closetExists) {
      await pool.request()
        .query(`
          INSERT INTO closet (Short_Sleeve, Long_Sleeve, Flannel, Tank_Top, Sweater, Sweatshirt, Jacket, Coat,
                              Jeans, Sweatpants, Dress_Pants, Shorts,
                              Tennis_Shoes, Boots, Flip_Flops, Sandals,
                              Sunglasses, Hat, Gloves, Scarf, Backpack, Purse, Umbrella)
          VALUES (@Id, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
        `);
      // Log the creation of a new closet
      console.log(`Closet created for user with ID: ${userId}`);
    }

    // Generate a JWT and set it as a cookie
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true, sameSite: 'strict' });

    // Return successful response with user details
    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        name: user.name
      }
    });

  // Error handling message if login process fails
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Failed to login' });
  }
});

// Route for registering a new user
router.post('/register', async (req, res) => {
  // Get username and password from request body
  const { username, email, password, name } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Connect to database
    const pool = await sql.connect();

    // Insert the user into the users table
    const userResult = await pool.request()
  .input('username', sql.NVarChar, username)
  .input('email', sql.NVarChar, email)
  .input('password', sql.NVarChar, hashedPassword)
  .input('name', sql.NVarChar, name)
  .input('pfp', sql.NVarChar, null) 
  .query(`
    INSERT INTO users (username, email, password, name, pfp)
    OUTPUT INSERTED.id
    VALUES (@username, @email, @password, @name, @pfp)
  `);

    // Get the new user's ID from the result
    const userId = userResult.recordset[0].id; 

    // Create a new row in the closet table for this user
    await pool.request()
      .input('Id', sql.Int, userId) 
      .query(`
        SET IDENTITY_INSERT closet ON;
        INSERT INTO closet (Id, Short_Sleeve, Long_Sleeve, Flannel, Tank_Top, Sweater, Sweatshirt, Jacket, Coat,
                            Jeans, Sweatpants, Dress_Pants, Shorts,
                            Tennis_Shoes, Boots, Flip_Flops, Sandals,
                            Sunglasses, Hat, Gloves, Scarf, Backpack, Purse, Umbrella)
        VALUES (@Id, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
        SET IDENTITY_INSERT closet OFF;
      `);

    // Return a successful response once registration is complete
    res.status(201).json({ message: 'User registered successfully' });

  // Error handling message if registration process fails
  } catch (error) { 
    console.error('Error during user registration:', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
});

// Export the router instance for use in other files
module.exports = router;
