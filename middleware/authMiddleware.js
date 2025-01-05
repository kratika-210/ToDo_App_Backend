const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwt_secret=process.env.jwt_secret;
const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Extract token from the header
    if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

    try {
        const decoded = jwt.verify(token, jwt_secret);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).json({ error: 'Invalid token.' });
    }
};

module.exports = authMiddleware;
