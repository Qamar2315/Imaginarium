// server/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // Import your controller

// Route to add a new user (after Firebase signup)
router.get('/:uid', userController.getUser);  // No auth middleware needed here
router.post('/', userController.createUser);  // No auth middleware needed here


module.exports = router;