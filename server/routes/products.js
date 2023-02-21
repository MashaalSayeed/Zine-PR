const express = require("express");
const router = express.Router();
const pool = require('../db/db');
const authorize = require('../middlewares/auth')
const uploads = require('../middlewares/uploads')

router.get('/:productid', async (req, res) => {
    try {
        const { productid } = req.params;
        const dbresult = await pool.query(
            "SELECT * FROM product WHERE productid=$1",
            [productid]
        )

        if (!dbresult.rows.length) return res.status(401).json({ message: "Product not found" })
        return res.json({ item: dbresult.rows[0] });
    } catch (error) {
        throw error;
    }
})

router.post('/create', authorize, uploads.single('image'), async (req, res) => {
    try {
        const { name, description, price } = req.body;
        const user = req.user;

        if (!name || !description || !price) return res.status(401).json({ message: 'Incomplete fields' })

        const dbresult = await pool.query(
            "INSERT INTO product (name, description, image, price, created_by) VALUES($1, $2, $3, $4, $5) RETURNING *",
            [name, description, req.filename, price, user.id]
        )

        console.log(dbresult)
        return res.json({ product: dbresult.rows[0] });
    } catch (error) {
        throw error;
    }
})

module.exports = router;