const express = require("express");
const pool = require("../db/db");
const router = express.Router();

router.get('/all', async (req, res) => {
    try {
        const dbresult = await pool.query(
            "SELECT category_name FROM category;",
        );

        const categories = dbresult.rows.map((row) => row.category_name)
        return res.json({ categories })
    } catch (error) {
        throw error;
    }
});

module.exports = router;