const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db/db');

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(username, password);

        const dbresult = await pool.query(
            "SELECT * FROM users WHERE username=$1",
            [username]
        );

        if (!dbresult.rows) return res.status(401).json({ message: "Username not found" })

        const user = dbresult.rows[0];
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ message: "Incorrect password" });

        const authUser = {
            userid: user.userid,
            username: user.username,
            email: user.email
        }

        jwt.sign(authUser, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "2h"})
        const expiryTime = new Date(2 * 60 * 60 * 1000 + Date.now());
        res.cookie("t", token, {
            expires: expiryTime,
            httpOnly: true,
        });
    
        return res.json(user);
    } catch (error) {
        throw error
    }
})

router.post('/signup', async (req, res) => {
    try {
        const { username, password, email } = req.body;

        // Check if email already exists
        const existingUser = await pool.query(
            "SELECT userid FROM users WHERE email=$1",
            [email]
        );
        if (existingUser) {
            return res.status(409).json({
                message: "Email already in use",
            });
        }

        // Encrypt password
        const salt = await bcrypt.genSalt(10);
        const hashed_password = await bcrypt.hash(password, salt);
    
        const dbresult = await pool.query(
            "INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *",
            [username, hashed_password, email]
        );

        res.json(dbresult.rows[0]);
    } catch (error) {
        throw error;
    }
})

module.exports = router;