const express = require("express");
const cookieParser = require('cookie-parser');
const cors = require('cors');
require("dotenv").config();

const pool = require('./db/db');
const app = express();

const PORT = process.env.PORT || 5555; 

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));

// ROUTES
app.use('/auth', require('./routes/auth'));
app.use('/products', require('./routes/products'))
app.use('/category', require('./routes/category'))
app.use('/review', require('./routes/review'))

app.use('/images', express.static('./uploads'))

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});