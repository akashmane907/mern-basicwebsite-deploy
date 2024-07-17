const mongoose = require('mongoose');
const jwt = require('jsonwebtoken'); // Corrected import

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true, // Ensure unique username
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensure unique email
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true, // Ensure unique phone number
    },

    isAdmin: {
        type: Boolean,
        default: false,
    },
});

// Generate JWT token
userSchema.methods.generateToken = function() {
    try {
        return jwt.sign(
            {
                userId: this._id.toString(), // Corrected to toString()
                username: this.username,
                email: this.email,
                isAdmin: this.isAdmin,
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1h' } // token expires in 1 hour
        );
    } catch (error) {
        next(error);
    }
};

const User = mongoose.model('User', userSchema);

module.exports = User;
