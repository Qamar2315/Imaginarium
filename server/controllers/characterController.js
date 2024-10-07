// controllers/characterController.js

const Character = require("../models/Character");
const User = require("../models/User");

// Create a new character
exports.createCharacter = async (req, res) => {
  try {
    const { name, description /* ... other fields */ } = req.body;
    const userId = req.user.uid;
    const user = await User.findOne({ uid: userId });
    if (!user) {
      return res.status(500).json({
        success: false,
        message: "User not found",
      });
    }
    const newCharacter = new Character({
      user: user._id,
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
};

// Get all characters for the logged-in user
exports.getCharacters = async (req, res) => {
  try {
    const userId = req.user.uid;
    const user = await User.findOne({ uid: userId });
    if (!user) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
    const characters = await Character.find({ user: user._id });
    res.json(characters);
  } catch (error) {
    console.error("Error getting characters:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get character by ID
exports.getCharacterById = async (req, res) => {
  try {
    const characterId = req.params.id;
    const userId = req.user.uid; // Ensure user owns the character
    const user = await User.findOne({ uid: userId });
    if (!user) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
    const character = await Character.findOne({
      _id: characterId,
      user: user._id,
    });

    if (!character) {
      return res.status(404).json({ message: "Character not found" });
    }

    res.json(character);
  } catch (error) {
    console.error("Error getting character by ID:", error);
    res.status(500).json({ message: error.message });
  }
};

// Update a character
exports.updateCharacter = async (req, res) => {
  try {
    const characterId = req.params.id;
    const userId = req.user.uid; // Get user ID
    const updates = req.body; // The fields to update

    const user = await User.findOne({ uid: userId});
    if (!user) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
    const updatedCharacter = await Character.findOneAndUpdate(
      { _id: characterId, user: user._id }, // Find by ID and user
      updates,
      { new: true } // Return the updated document
    );
    
    if (!updatedCharacter) {
      return res
        .status(404)
        .json({ message: "Character not found" });
    }
    res.json(updatedCharacter);
  } catch (error) {
    console.error("Error updating character:", error);
    res.status(500).json({ message: error.message });
  }
};

// Delete a character
exports.deleteCharacter = async (req, res) => {
  try {
    const characterId = req.params.id;
    const userId = req.user.uid; // Ensure only the owner can delete
    const user = await User.findOne({ uid: userId});
    if (!user) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
    const character = await Character.findOne({
      _id: characterId
    });
    if (!character) {
      return res.status(404).json({ message: "Character not found" });
    }
    if(character.user.toString() !== user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const deletedCharacter = await Character.findOneAndDelete({
      _id: characterId,
      user: user._id,
    });

    if (!deletedCharacter) {
      return res
        .status(404)
        .json({ message: "Character not found or unauthorized" });
    }

    res.json({ message: "Character deleted successfully" });
  } catch (error) {
    console.error("Error deleting character:", error);
    res.status(500).json({ message: error.message });
  }
};
