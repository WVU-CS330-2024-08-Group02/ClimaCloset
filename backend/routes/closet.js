const express = require('express');
const sql = require('mssql'); // Assuming you're using mssql for Azure SQL Server
const router = express.Router();

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
        const query = `SELECT ${accessories.join(", ")} FROM closet WHERE Id = @Id`;

        const result = await pool.request()
            .input('Id', sql.Int, Id)
            .query(query);

        if (result.recordset.length === 0) {
            return res.status(404).json({ error: 'No items found in your closet' });
        }

        res.status(200).json(result.recordset[0]);
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
        accessories.forEach(accessory => {
            const value = parseInt(req.body[accessory], 10) || 0;
            request.input(accessory, sql.Int, value);
        });

        // SQL Server-compatible UPSERT (MERGE)
        
        const mergeQuery = `
            SET IDENTITY_INSERT closet ON;
            MERGE INTO closet AS Target
            USING (VALUES (@Id, ${accessories.map(a => `@${a}`).join(", ")})) AS Source (Id, ${accessories.join(", ")})
            ON Target.Id = Source.Id
            WHEN MATCHED THEN 
                UPDATE SET ${accessories.map(a => `${a} = Source.${a}`).join(", ")}
            WHEN NOT MATCHED THEN 
                INSERT (Id, ${accessories.join(", ")})
                VALUES (Source.Id, ${accessories.map(a => `Source.${a}`).join(", ")});
            SET IDENTITY_INSERT closet OFF
        `;

        console.log('Executing query:', mergeQuery);
        await request.query(mergeQuery);
        res.status(201).json({ message: 'Closet saved successfully' });
    } catch (error) {
        console.error('Error saving closet data:', error);
        res.status(500).json({ error: 'Failed to save closet data' });
    }
});

module.exports = router;
