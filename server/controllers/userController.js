// server/controllers/userController.js
const { database } = require('firebase-admin');
const User = require('../models/User');

exports.createUser = async (req, res) => {
    try {
        const { uid, name, email } = req.body;  // Get user data from request

        // Check if the user already exists (optional)
        const existingUser = await User.findOne({ uid });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        const newUser = new User({ uid, name, email });
        const savedUser = await newUser.save();

        res.status(201).json(savedUser);

    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: error.message });
    }
};

exports.getUser = async (req, res) => {
    try {
        const userId = req.params.uid;
        const user = await User.findOne({ uid: userId});
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({
            success: true,
            user
        });
    }
    catch (error) {
        console.error('Error getting user:', error);
        res.status(500).json({ message: error.message });
    }
};