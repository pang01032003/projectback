const express = require('express');
const router = express.Router();
const RoomController = require('../controllers/room-controller');

// Create a new room
router.post('/room', RoomController.createRoom);

// Get all rooms
router.get('/room', RoomController.getRooms);

// Get room by ID
router.get('/room/:id', RoomController.getRoomById);

// Update room by ID
router.put('/room/:id', RoomController.updateRoom);

// Delete room by ID
router.delete('/room/:id', RoomController.deleteRoom);

module.exports = router;