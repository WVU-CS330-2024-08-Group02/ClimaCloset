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

        // Ensure all accessories have default values
        const request = pool.request();
        request.input('Id', sql.Int, Id);

        const clothingTypes = [...tops, ...bottoms, ...shoes, ...accessories];

        clothingTypes.forEach(item => {
            const value = parseInt(req.body[item], 10) || 0;
            request.input(item, sql.Int, value);
        });

        // SQL Server-compatible UPSERT (MERGE)
        
        const mergeQuery = `
            SET IDENTITY_INSERT closet ON;
            MERGE INTO closet AS Target
            USING (VALUES (@Id, ${clothingTypes.map(c => `@${c}`).join(", ")})) AS Source (Id, ${clothingTypes.join(", ")})
            ON Target.Id = Source.Id
            WHEN MATCHED THEN 
                UPDATE SET ${clothingTypes.map(c => `${c} = Source.${c}`).join(", ")}
            WHEN NOT MATCHED THEN 
                INSERT (Id, ${clothingTypes.join(", ")})
                VALUES (Source.Id, ${clothingTypes.map(c => `Source.${c}`).join(", ")});
            SET IDENTITY_INSERT closet OFF
        `;

        await request.query(mergeQuery);
        res.status(201).json({ message: 'Closet saved successfully' });
    } catch (error) {
        console.error('Error saving closet data:', error);
        res.status(500).json({ error: 'Failed to save closet data' });
    }
});

module.exports = router;
