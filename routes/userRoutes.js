const express = require('express');
const User = require('../models/user');
const router = express.Router();


    // Signup new user
    router.post('/signup', async (req, res) => {
        const { username, email, password } = req.body;

        // Validate request
        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Username, email, and password cannot be empty."
            });
        }

        const user = new User({
            username,
            email,
            password, // Password will be hashed in the schema pre-save hook
        });

        try {
            // Save the user
            await user.save();
            res.status(201).json({ message: "User created successfully.", user_id: user._id });
        } catch (error) {
            console.error('Error creating user:', error);
            if (error.code === 11000) { // Duplicate key error
                return res.status(400).json({ message: "Username or email already exists." });
            }
            res.status(500).json({ error: "Error creating user." });
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

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ 
                status: false, 
                message: "Login sucessful." 
            });
        }

        const isMatch = await user.comparePassword(password); // Use the method to compare passwords
        if (!isMatch) {
            return res.status(400).json({ 
                status: false, 
                message: "Password is invalid." 
            });
        }

        res.json({ 
            status: true, 
            message: "User is valid.", 
            user_id: user._id,
            username: user.username,
            email: user.email
        });
    });


module.exports = router;
