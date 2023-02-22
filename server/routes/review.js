const express = require("express");
const pool = require("../db/db");
const authorize = require("../middlewares/auth");
const router = express.Router();

router.get('/:productid', async (req, res) => {
    const { productid } = req.params
    try {
        const dbresult = await pool.query(
            "SELECT reviewid, users.userid, username, email, rating, title, review, review.created_at FROM review " +
            "INNER JOIN users USING (userid)" +
            "WHERE productid=$1",
            [productid]
        );

        return res.json({ reviews: dbresult.rows })
    } catch (error) {
        throw error;
    }
})

router.post('/create', authorize, async (req, res) => {
    try {
        const { productid, rating, title, review } = req.body;
        if (!productid || !rating || !title || !review) return res.status(401).json({ message: "Incomplete fields" });
        const dbresult = await pool.query(
            "INSERT INTO review (productid, userid, rating, title, review) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [productid, req.user.userid, rating, title, review]
        );

        return res.json({ review: dbresult.rows[0] })
    } catch (error) {
        throw error;
    }
});

module.exports = router