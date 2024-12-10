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
router.post('/saveCloset', async (req,res) => {
    const {Backpack , Boots, Coat, DressPants, FlipFlops, Gloves, Jacket, Jeans, LongSleeves, Purse, Sandals, Scarf, Shorts, ShortSleeves, Sneakers, Sunglasses, Sweater, Sweatpants, Sweatshirt, Umbrella} = req.body;

    try {
        // Connect to server
        const pool = await sql.connect();
        await pool.request()
            .input('Backpack', sql.Int, Backpack)
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
            .input('Scarf', sql.Int, Scarf)
            input('Shorts', sql.Int, Shorts)
            .input('ShortSleeves', sql.Int, ShortSleeves)
            .input('Sneakers', sql.Int, Sneakers)
            .input('Sunglasses', sql.Int, Sunglasses)
            .input('Sweater', sql.Int, Sweater)
            .input('Sweatpants', sql.Int, Sweatpants)
            .input('Sweatshirt', sql.Int, Sweatshirt)
            .input('Umbrella', sql.Int, Umbrella)
            .query('INSERT INTO closet (Backpack, Boots, Coat, DressPants, FlipFlops, Gloves, Jacket, Jeans, LongSleeves, Purse, Sandals, Scarf, Shorts, ShortSleeves, Sneakers, Sunglasses, Sweater, Sweatpants, Sweatshirt, Umbrella) VALUES(@Backpack, @Boots, @Coat, @DressPants, @FlipFlops, @Gloves, @Jacket, @Jeans, @LongSleeves, @Purse, @Sandals, @Scarf, @Shorts, @ShortSleeves, @Sneakers, @Sunglasses, @Sweater, @Sweatpants, @Sweatshirt, @Umbrella)');

            res.status(201).json({ message: 'Closet Saved Successfully'});
    } catch (error) {
        console.error('Error attempting to save to closet', error);
        res.status(500).json({ error: 'Failed to register user' });
    }
});

module.exports = router;