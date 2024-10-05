const express = require('express');
const router = express.Router();
const Character = require('../models/Character'); // Your Character model

// Create a new character
router.post('/', async (req, res) => {
    try {
        const { name, description, /* ... other fields */ } = req.body;
        const userId = req.user.uid; // Get the user's ID from the decoded token


        const newCharacter = new Character({
            user: userId, // Store user ID with character
            name,
            description,
            // ... other character fields

        });

        const savedCharacter = await newCharacter.save();
        res.status(201).json(savedCharacter);

    } catch (error) {
        console.error("Error creating character:", error);
        res.status(500).json({ message: error.message });
    }
});


// Get all characters for the logged-in user
router.get('/', async (req, res) => {
    try {
        const userId = req.user.uid;
        const characters = await Character.find({ user: userId });
        res.json(characters);
    } catch (error) {
        console.error("Error getting characters:", error);
        res.status(500).json({ message: error.message });
    }

});

// ... other routes (get by ID, update, delete, etc.)


module.exports = router;