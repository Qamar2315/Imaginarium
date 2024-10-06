// routes/characterRoutes.js
const express = require('express');
const router = express.Router();
const characterController = require('../controllers/characterController');


router.post('/', characterController.createCharacter);
router.get('/', characterController.getCharacters);
router.get('/:id', characterController.getCharacterById);  // Get by ID
router.put('/:id', characterController.updateCharacter); // Update
router.delete('/:id', characterController.deleteCharacter); // Delete


module.exports = router;