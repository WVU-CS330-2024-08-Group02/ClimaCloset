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

// Pull closet from Azure
router.post('/PullCloset', async (req, res) => {
    const { Id } = req.body; // Assuming the ID is passed in the request body

    if (!Id) {
        return res.status(400).json({ error: 'Id is required' });
    }

    try {
        // Connect to server
        const pool = await sql.connect();

        // Fetch data for the specific Id from the closet table
        const result = await pool.request()
            .input('Id', sql.Int, Id)
            .query('SELECT Backpack, Boots, Coat, DressPants, FlipFlops, Gloves, Jacket, Jeans, LongSleeves, Purse, Sandals, Scarf, Shorts, ShortSleeves, Sneakers, Sunglasses, Sweater, Sweatpants, Sweatshirt, Umbrella FROM closet WHERE Id = @Id');

        // Check if a record was found
        if (result.recordset.length === 0) {
            return res.status(404).json({ error: 'No data found for the given Id' });
        }

        // Store each item in a variable
        const {
            Backpack, Boots, Coat, DressPants, FlipFlops,
            Gloves, Jacket, Jeans, LongSleeves, Purse,
            Sandals, Scarf, Shorts, ShortSleeves, Sneakers,
            Sunglasses, Sweater, Sweatpants, Sweatshirt, Umbrella
        } = result.recordset[0]; // Extract the first record

        // Send the data as a response
        res.status(200).json({
            Backpack,
            Boots,
            Coat,
            DressPants,
            FlipFlops,
            Gloves,
            Jacket,
            Jeans,
            LongSleeves,
            Purse,
            Sandals,
            Scarf,
            Shorts,
            ShortSleeves,
            Sneakers,
            Sunglasses,
            Sweater,
            Sweatpants,
            Sweatshirt,
            Umbrella
        });
    } catch (error) {
        console.error('Error attempting to pull from closet', error);
        res.status(500).json({ error: 'Failed to retrieve closet data' });
    }
});




// Save Closet to Azure
router.post('/saveCloset', async (req, res) => {
    const { Id, Backpack, Boots, Coat, DressPants, FlipFlops, Gloves, Jacket, Jeans, LongSleeves, Purse, Sandals, Scarf, Shorts, ShortSleeves, Sneakers, Sunglasses, Sweater, Sweatpants, Sweatshirt, Umbrella } = req.body;

    if (!Id) {
        return res.status(400).json({ error: 'User Id is required' });
    }

    try {
        const pool = await sql.connect();
        await pool.request()
            .input('Id', sql.Int, Id) // Ensure Id is part of the query
            .input('Backpack', sql.Int, Backpack || 0)
            .input('Boots', sql.Int, Boots || 0)
            .input('Coat', sql.Int, Coat || 0)
            .input('DressPants', sql.Int, DressPants || 0)
            .input('FlipFlops', sql.Int, FlipFlops || 0)
            .input('Gloves', sql.Int, Gloves || 0)
            .input('Jacket', sql.Int, Jacket || 0)
            .input('Jeans', sql.Int, Jeans || 0)
            .input('LongSleeves', sql.Int, LongSleeves || 0)
            .input('Purse', sql.Int, Purse || 0)
            .input('Sandals', sql.Int, Sandals || 0)
            .input('Scarf', sql.Int, Scarf || 0)
            .input('Shorts', sql.Int, Shorts || 0)
            .input('ShortSleeves', sql.Int, ShortSleeves || 0)
            .input('Sneakers', sql.Int, Sneakers || 0)
            .input('Sunglasses', sql.Int, Sunglasses || 0)
            .input('Sweater', sql.Int, Sweater || 0)
            .input('Sweatpants', sql.Int, Sweatpants || 0)
            .input('Sweatshirt', sql.Int, Sweatshirt || 0)
            .input('Umbrella', sql.Int, Umbrella || 0)
            .query(`
                INSERT INTO closet (Id, Backpack, Boots, Coat, DressPants, FlipFlops, Gloves, Jacket, Jeans, LongSleeves, Purse, Sandals, Scarf, Shorts, ShortSleeves, Sneakers, Sunglasses, Sweater, Sweatpants, Sweatshirt, Umbrella)
                VALUES (@Id, @Backpack, @Boots, @Coat, @DressPants, @FlipFlops, @Gloves, @Jacket, @Jeans, @LongSleeves, @Purse, @Sandals, @Scarf, @Shorts, @ShortSleeves, @Sneakers, @Sunglasses, @Sweater, @Sweatpants, @Sweatshirt, @Umbrella)
                ON DUPLICATE KEY UPDATE
                Backpack = @Backpack, Boots = @Boots, Coat = @Coat, DressPants = @DressPants, FlipFlops = @FlipFlops, Gloves = @Gloves, Jacket = @Jacket, Jeans = @Jeans, LongSleeves = @LongSleeves, Purse = @Purse, Sandals = @Sandals, Scarf = @Scarf, Shorts = @Shorts, ShortSleeves = @ShortSleeves, Sneakers = @Sneakers, Sunglasses = @Sunglasses, Sweater = @Sweater, Sweatpants = @Sweatpants, Sweatshirt = @Sweatshirt, Umbrella = @Umbrella
            `);

        res.status(201).json({ message: 'Closet saved successfully' });
    } catch (error) {
        console.error('Error attempting to save to closet:', error);
        res.status(500).json({ error: 'Failed to save closet data' });
    }
});

module.exports = router;