// server/routes/chatRoutes.js
const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController'); // Import your controller
const authenticateToken = require('../middlewares/authMiddleware'); // Authentication middleware


// Protect chat routes with authentication middleware
router.get('/:characterId', authenticateToken, chatController.getChatHistory);
router.post('/:characterId', authenticateToken, chatController.saveMessage);  // Use controller


module.exports = router;