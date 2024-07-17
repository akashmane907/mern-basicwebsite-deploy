const jwt = require('jsonwebtoken');
const User = require('../models/user-model');

// Middleware to verify JWT token
const authmiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: 'Authorization header missing' });
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Token missing' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const userData = await User.findOne({ email: decoded.email }).select({ password: 0 });

        if (!userData) {
            return res.status(401).json({ message: 'User not found' });
        }

        req.user = decoded;
        console.log(userData);
        req.userData = userData;
        req.token = token;
        req.userID = userData.userID;
        next();
    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authmiddleware;
