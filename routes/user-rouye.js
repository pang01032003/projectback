const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user-controller');

// Create a new user
router.post('/users', UserController.createUser);

// Get all users
router.get('/users', UserController.getUsers);

// Get user by ID
router.get('/users/:id', UserController.getUserById);

// Update user by ID
router.put('/users/:id', UserController.updateUser);

// Delete user by ID
router.delete('/users/:id', UserController.deleteUser);

module.exports = router;