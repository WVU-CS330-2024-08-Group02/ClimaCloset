/**
 * closet.js
 * 
 * This file defines routes for saving and removing
 * clothes from the closet
 */

const express = require('express');
const jwt = require('jsonwebtoken');
const { sql } = require('../config');
const router = express.Router();


// Save Closet to Azure
router.post('/register', async (req,res) => {
    const {Backpack , Boots, Coat, DressPants, FlipFlops, Gloves, Jacket, Jeans, LongSleeves, Purse, Sandals, Scarf, Shorts, ShortSleeves, Sneakers, Sunglasses, Sweater, Sweatpants, Sweatshirt, Umbrella} = req.body;

    try {
        // Connect to server
        const pool = await sql.connect();
        await pool.request()
            .input('BackPack', sql.Int, Backpack)
            .input('Boots', sql.Int, Boots)
            .input('Coat', sql.Int, Coat)
            .input('DressPants', sql.Int, DressPants)
            .input('FlipFlops', sql.Int, FlipFlops)
            .input('Gloves', sql.Int, Gloves)
            .input('Jacket', sql.Int, Jacket)
            .input('Jeans', sql.Int, Jeans)
            .input('LongSleeves', sql.Int, LongSleeves)
            .input('Purse', sql.Int, Purse)
            .input('Sandals', sql.Int, Sandals)
            .input('BackPack', sql.Int, Backpack)
    }
})