const jwt = require('jsonwebtoken');

async function authorize(req, res, next) {
    try {
        jwt.verify(
            req.cookies.t,
            process.env.ACCESS_TOKEN_SECRET,
            (error, user) => {
                if (error) return res.status(401).json({message: "Unauthorized"});
                req.user = user;
                next();
            }
        )
    } catch (error) {
        throw error
    }
}

module.exports = authorize;