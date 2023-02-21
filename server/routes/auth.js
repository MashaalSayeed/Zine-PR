const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db/db');
const authorize = require('../middlewares/auth')

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, password);

        const dbresult = await pool.query(
            "SELECT * FROM users WHERE email=$1",
            [email]
        );

        if (!dbresult.rows.length) return res.status(401).json({ message: "Incorrect Email ID or password" })

        const user = dbresult.rows[0];
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ message: "Incorrect Email ID or password" });

        const authUser = {
            userid: user.userid,
            username: user.username,
            email: user.email
        }

        const token = jwt.sign(authUser, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "2h"})
        const expiryTime = new Date(2 * 60 * 60 * 1000 + Date.now());
        res.cookie("t", token, {
            expires: expiryTime,
            httpOnly: true,
        });
    
        return res.json({ expires: expiryTime, user: authUser });
    } catch (error) {
        throw error
    }
})

router.post('/signup', async (req, res) => {
    try {
        const { username, password, email } = req.body;

        // Check if email already exists
        const existingUser = await pool.query(
            "SELECT email, username FROM users WHERE email=$1 OR username=$2",
            [email, username]
        );
        if (existingUser.rows.length) {
            console.log(existingUser.rows[0])
            return res.status(401).json({ 
                message: existingUser.rows[0].email == email ? "Email already in use" : "Username already in use"
            });
        }

        // Encrypt password
        const salt = await bcrypt.genSalt(10);
        const hashed_password = await bcrypt.hash(password, salt);
    
        const dbresult = await pool.query(
            "INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *",
            [username, hashed_password, email]
        );

        res.json({ message: "Sign up successful!" });
    } catch (error) {
        throw error;
    }
})

router.post('/logout', [authorize], async (req, res) => {
    try {
        res.clearCookie('t')
        return res.json({ message: "Logged Out" })
    } catch (error) {
        throw error;
    }
})

module.exports = router;