/**
 * This file is used to save user input about what type of clothing items 
 * they own to their personal closet. With this information saved to the user's 
 * closet, through their account, the app is now able to generate outfit options 
 * based on what the user owns. 
 */

// Import libraries and modules 
const express = require('express');
const sql = require('mssql'); 
const router = express.Router();

// Define all tops
const tops = [
    "Short_Sleeve", "Long_Sleeve", "Flannel", "Tank_Top", "Sweater", "Sweatshirt", "Jacket", "Coat"
];

// Define all bottoms
const bottoms = [
    "Jeans", "Sweatpants", "Dress_Pants", "Shorts"
];

// Define all shoes
const shoes = [
    "Tennis_Shoes", "Boots", "Flip_Flops", "Sandals"
];

// Define all accessories
const accessories = [
    "Sunglasses", "Hat", "Gloves", "Scarf", "Backpack", "Purse", "Umbrella"
];

// Route for fetching the user's closet data
router.post('/PullCloset', async (req, res) => {
    // Get the user ID from request body
    const { Id } = req.body;

    // Error handling message if ID is missing in request
    if (!Id) {
        return res.status(400).json({ error: 'User Id is required' });
    }

    try {
        // Connect to database
        const pool = await sql.connect();

        // Fetch stored closet data for the user
        const closetResult = await pool.request()
            .input('Id', sql.Int, Id)
            .query(`
                SELECT *
                FROM closet
                WHERE id = @Id
            `);

        // Create a new row with default values in the closet table for this user if none exist
        if (closetResult.recordset.length === 0) {
            await pool.request()
                .input('Id', sql.Int, Id)
                .query(`
                    SET IDENTITY_INSERT closet ON;
                    INSERT INTO closet (Id, Short_Sleeve, Long_Sleeve, Flannel, Tank_Top, Sweater, Sweatshirt, Jacket, Coat,
                                        Jeans, Sweatpants, Dress_Pants, Shorts,
                                        Tennis_Shoes, Boots, Flip_Flops, Sandals,
                                        Sunglasses, Hat, Gloves, Scarf, Backpack, Purse, Umbrella)
                    VALUES (@Id, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
                    SET IDENTITY_INSERT closet OFF;
                `);
            
                // Log creation of new closet
                console.log(`Closet created for user Id: ${Id}`);
        }

        // Fetch user's closet data 
        const updatedClosetResult = await pool.request()
            .input('Id', sql.Int, Id)
            .query(`
                SELECT
                    Short_Sleeve, Long_Sleeve, Flannel, Tank_Top, Sweater, Sweatshirt, Jacket, Coat,
                    Jeans, Sweatpants, Dress_Pants, Shorts,
                    Tennis_Shoes, Boots, Flip_Flops, Sandals,
                    Sunglasses, Hat, Gloves, Scarf, Backpack, Purse, Umbrella
                FROM closet 
                WHERE Id = @Id
            `);
       
        // Organize the fetched closet data
        const clothingData = {
            tops: tops.map(item => updatedClosetResult.recordset[0][item] || 0),
            bottoms: bottoms.map(item => updatedClosetResult.recordset[0][item] || 0),
            shoes: shoes.map(item => updatedClosetResult.recordset[0][item] || 0),
            accessories: accessories.map(item => updatedClosetResult.recordset[0][item] || 0)
        };

        // Send the closet data as a JSON response
        res.status(200).json(clothingData);

    // Error handling message if fetching closet data fails
    } catch (error) {
        console.error('Error pulling closet data:', error);
        res.status(500).json({ error: 'Failed to retrieve closet data' });
    }
});

// Route for saving the user's closet data
router.post('/saveCloset', async (req, res) => {
    // Get the user ID from request body
    const { Id } = req.body;

    // Error handling message if ID is missing in request
    if (!Id) {
        return res.status(400).json({ error: 'User Id is required' });
    }

    try {
        // Connect to database
        const pool = await sql.connect();

        // Fetch existing closet data
        const currentDataQuery = `
            SELECT *
            FROM closet
            WHERE Id = @Id
        `;
        const existingDataResult = await pool.request()
            .input('Id', sql.Int, Id)
            .query(currentDataQuery);

        // Error handling message if closet data is not found
        if (existingDataResult.recordset.length === 0) {
            return res.status(404).json({ error: 'Closet not found for the given user Id' });
        }

        // Access existing closet data
        const existingData = existingDataResult.recordset[0];

        // Merge submitted data with existing data
        const clothingTypes = [...tops, ...bottoms, ...shoes, ...accessories];
        const mergedData = {};

        // Use default values if submitted value is invalid
        clothingTypes.forEach(type => {
            mergedData[type] = req.body.hasOwnProperty(type)
                ? parseInt(req.body[type], 10) || 0 
                : existingData[type]; 
        });

        // Update SQL query with on submitted data
        const updateFields = clothingTypes
            .filter(type => req.body.hasOwnProperty(type)) 
            .map(type => `${type} = @${type}`)
            .join(", ");

        // Update query with changed fields
        if (updateFields) {
            const updateQuery = `
                UPDATE closet
                SET ${updateFields}
                WHERE Id = @Id
            `;
            const request = pool.request();
            request.input('Id', sql.Int, Id);

            // Add submitted values to the request
            Object.entries(mergedData).forEach(([key, value]) => {
                request.input(key, sql.Int, value);
            });

            // Execute the update query
            await request.query(updateQuery);
        }

        // Return successful response once updated
        res.status(200).json({ message: 'Closet updated successfully' });

    // Error handling message if closet update fails
    } catch (error) {
        console.error('Error saving closet data:', error);
        res.status(500).json({ error: 'Failed to save closet data' });
    }
});

// Export the router instance for use in other files
module.exports = router;
