const express = require("express");
const pool = require("../db/db");
const router = express.Router();

router.get('/all', async (req, res) => {
    try {
        const dbresult = await pool.query(
            "SELECT * FROM category;",
        );

        const categories = dbresult.rows.map((row) => {return {id: row.categoryid, name: row.category_name}})
        return res.json({ categories })
    } catch (error) {
        throw error;
    }
});

module.exports = router;