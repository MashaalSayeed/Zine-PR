const express = require("express");
const cookieParser = require('cookie-parser');
require("dotenv").config();

const pool = require('./db/db');
const app = express();

const PORT = process.env.PORT || 5555; 

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// ROUTES
app.use('/auth', require('./routes/auth'));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});