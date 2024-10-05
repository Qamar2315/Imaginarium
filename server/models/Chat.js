// server/models/Chat.js
const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    character: { type: mongoose.Schema.Types.ObjectId, ref: 'Character', required: true },
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }], // Array of Message ObjectIds

}, { timestamps: true });

module.exports = mongoose.model('Chat', chatSchema);