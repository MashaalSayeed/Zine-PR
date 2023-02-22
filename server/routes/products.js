const express = require("express");
const router = express.Router();
const pool = require('../db/db');
const authorize = require('../middlewares/auth')
const uploads = require('../middlewares/uploads')

router.get('/product/:productid', async (req, res) => {
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

router.post('/create', [authorize, uploads.single('image')], async (req, res) => {
    try {
        const { name, description, price, category } = req.body;
        const user = req.user;

        console.log(req.body)

        if (!req.file) return res.json({ message: "missing image!" })
        if (!name || !description || !price || !category) return res.status(401).json({ message: 'Incomplete fields' })

        // Set category id
        const dbresult = await pool.query(
            "INSERT INTO product (name, description, image, price, created_by, categoryid) \
            SELECT $1, $2, $3, $4, $5, categoryid FROM category WHERE category_name=$6 \
            RETURNING *",
            [name, description, req.file.filename, price, user.userid, category]
        )

        console.log(dbresult.rows[0])
        return res.json({ product: dbresult.rows[0] });
    } catch (error) {
        throw error;
    }
})

/**
 * Returns 10 search results based on category and name (if given)
 */
router.get('/search', async (req, res) => {
    try {
        let { product, category } = req.query;
        product = `%${product}%`;
        let dbresult;
        if (category === "All") {
            dbresult = await pool.query(
                "SELECT * FROM product WHERE name ILIKE $1",
                [product]
            );
        } else {
            console.log(product, category);
            dbresult = await pool.query(
                "SELECT * FROM product \
                INNER JOIN category ON category.categoryid=product.categoryid \
                WHERE name ILIKE $1 AND category_name=$2 \
                LIMIT 10",
                [product, category]
            );
        }
    
        return res.json({ results: dbresult.rows });
    } catch (error) {
        throw error;
    }
})

module.exports = router;