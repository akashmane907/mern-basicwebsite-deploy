const express = require('express');
const router = express.Router();
const { home, register, login, user } = require('../controllers/auth-controller');
const signupSchema = require('../validators/auth-validator'); // Adjust the path if needed
const validate = require('../middleware/validate-middleware');
const authMiddleware = require('../middleware/auth-middleware');

// Define the routes and their corresponding handlers
router.get('/', home);
router.post('/register', validate(signupSchema), register);
router.post('/login', login);
router.get('/user', authMiddleware, user);

module.exports = router;
