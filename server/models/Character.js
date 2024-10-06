const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Reference to the User model (or just store UID as a string)
    name: { type: String, required: true },
    description: { type: String }
});

module.exports = mongoose.model('Character', characterSchema);