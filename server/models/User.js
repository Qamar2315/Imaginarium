// server/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    uid: { type: String, required: true, unique: true }, // Firebase UID
    name: { type: String }, // User's name (optional - if you're storing it here)
    email: { type: String }, // User's email
    // ... other user fields as needed

}, { timestamps: true }); // Add timestamps (createdAt, updatedAt)

module.exports = mongoose.model('User', userSchema);