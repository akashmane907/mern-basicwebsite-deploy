const User = require('../models/user-model'); 
const bcrypt = require('bcrypt');
require('dotenv').config();

const home = async (req, res) => {
    try {
        res.status(200).send('Welcome to My website! authenticated');
    } catch (err) {
        console.log(err);
    }
};

// Registration logic
const register = async (req, res) => {
    try {
        console.log('Request Body:', req.body); // Log the request body for debugging

        const { username, email, phone, password } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }, { phone }] });
        if (existingUser) {
            return res.status(400).json({ message: 'User with the same username, email, or phone number already exists' });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = new User({ username, email, phone, password: hashedPassword });
        await user.save();

        const token = user.generateToken();

        res.status(201).json({ message: 'User registered successfully', token, userId: user._id.toString() });
    } catch (err) {
        //console.log(err);
        //res.status(500).json({ message: 'Server error' });
        next(error)
    }
};

// Login logic
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        const token = user.generateToken();

        res.json({ message: 'User logged in successfully', token, userId: user._id.toString() });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server error' });
    }
};
//********************************
//to send user data -user logic
// ********************************

const user = async(req , res) => {
    try {
        const userData = req.user;
        console.log(userData);
        return res.status(200).json({ message: userData});
    } catch (err){
        console.log(err);
        res.status(500).json({ message: 'Server error' });
    }
};






module.exports = { home, register, login, user };
