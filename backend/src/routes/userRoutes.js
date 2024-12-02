const express = require('express');
const User = require('../models/user');
const router = express.Router();

// Signup new user
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    // Validate request
    if (!username || !email || !password) {
        return res.status(400).json({
            status: false,
            message: "Username, email, and password cannot be empty."
        });
    }

    const user = new User({ username, email, password });

    try {
        // Save the user
        await user.save();
        res.status(201).json({ 
            status: true,
            message: "User created successfully.", 
            user_id: user._id 
        });
    } catch (error) {
        console.error('Error creating user:', error);
        if (error.code === 11000) { // Duplicate key error
            return res.status(400).json({ 
                status: false, 
                message: "Username or email already exists." 
            });
        }
        res.status(500).json({ 
            status: false, 
            message: "Error creating user." 
        });
    }
});

// Login a user
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Validate request
    if (!username || !password) {
        return res.status(400).json({ 
            status: false, 
            message: "Username and password cannot be empty." 
        });
    }

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ 
                status: false, 
                message: "User does not exist." 
            });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ 
                status: false, 
                message: "Invalid password." 
            });
        }

        res.status(200).json({ 
            status: true, 
            message: "Login successful.", 
            user_id: user._id,
            username: user.username,
            email: user.email
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ 
            status: false, 
            message: "Error logging in." 
        });
    }
});

module.exports = router;
