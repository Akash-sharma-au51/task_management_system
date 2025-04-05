const jwt = require('jsonwebtoken');
const User = require('../models/userModal');
const bcrypt = require('bcryptjs');;
const { JWT_SECRET } = process.env;

const authMiddleware = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Authorization header
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // Attach user info to request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}
module.exports = {
    authMiddleware,
};
