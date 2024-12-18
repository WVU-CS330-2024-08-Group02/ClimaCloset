const express = require('express');
const sql = require('mssql'); // Assuming you're using mssql for Azure SQL Server
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

// Route: Pull Closet
router.post('/PullCloset', async (req, res) => {
    const { Id } = req.body;

    if (!Id) {
        return res.status(400).json({ error: 'User Id is required' });
    }

    try {
        const pool = await sql.connect();
        const query = `
        SELECT
            Short_Sleeve, Long_Sleeve, Flannel, Tank_Top, Sweater, Sweatshirt, Jacket, Coat,
            Jeans, Sweatpants, Dress_Pants, Shorts,
            Tennis_Shoes, Boots, Flip_Flops, Sandals,
            Sunglasses, Hat, Gloves, Scarf, Backpack, Purse, Umbrella
        FROM closet 
        WHERE Id = @Id
        `;

        const result = await pool.request()
            .input('Id', sql.Int, Id)
            .query(query);

        if (result.recordset.length === 0) {
            return res.status(404).json({ error: 'No items found in your closet' });
        }

        const clothingData = {
            tops: tops.map(item => result.recordset[0][item] || 0),
            bottoms: bottoms.map(item => result.recordset[0][item] || 0),
            shoes: shoes.map(item => result.recordset[0][item] || 0),
            accessories: accessories.map(item => result.recordset[0][item] || 0)
        };

        res.status(200).json(clothingData);
    } catch (error) {
        console.error('Error pulling closet data:', error);
        res.status(500).json({ error: 'Failed to retrieve closet data' });
    }
});

// Route: Save Closet
router.post('/saveCloset', async (req, res) => {
    const { Id } = req.body;

    if (!Id) {
        return res.status(400).json({ error: 'User Id is required' });
    }

    try {
        const pool = await sql.connect();

        // Step 1: Fetch existing data
        const currentDataQuery = `
            SELECT *
            FROM closet
            WHERE Id = @Id
        `;
        const existingDataResult = await pool.request()
            .input('Id', sql.Int, Id)
            .query(currentDataQuery);

        if (existingDataResult.recordset.length === 0) {
            return res.status(404).json({ error: 'Closet not found for the given user Id' });
        }

        const existingData = existingDataResult.recordset[0];

        // Step 2: Merge submitted data with existing data
        const clothingTypes = [...tops, ...bottoms, ...shoes, ...accessories];
        const mergedData = {};

        clothingTypes.forEach(type => {
            mergedData[type] = req.body.hasOwnProperty(type)
                ? parseInt(req.body[type], 10) || 0 // Use submitted value if present
                : existingData[type]; // Otherwise, retain existing value
        });

        // Step 3: Dynamically build the update query
        const updateFields = clothingTypes
            .filter(type => req.body.hasOwnProperty(type)) // Only include submitted fields
            .map(type => `${type} = @${type}`)
            .join(", ");

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

            // Execute the query
            await request.query(updateQuery);
        }

        res.status(200).json({ message: 'Closet updated successfully' });
    } catch (error) {
        console.error('Error saving closet data:', error);
        res.status(500).json({ error: 'Failed to save closet data' });
    }
});

module.exports = router;
