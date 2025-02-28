const express = require('express');
const router = express.Router();
const User = require('/Users/neerajbudhiraja/Desktop/Semester 5/COMP3123 Full Stack Development/Assignments/101415118_Comp3123_Assignment/backend/models/User');
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');

router.post('/signup', [
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        user = new User({
            username,
            email,
            password
        });

        await user.save();
        res.status(201).json({ message: 'User created successfully', user_id: user._id });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});


router.post('/login', async (req, res) => {
    console.log('Request Body:', req.body); // Log incoming request body
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.log('User not found');
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('Password does not match');
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        res.status(200).json({ message: 'Login successful', token: 'your_token_here' });
    } catch (error) {
        console.error('Error during login:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});


module.exports = router;
