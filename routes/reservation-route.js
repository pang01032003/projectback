const express = require('express');
const router = express.Router();
const ReservationController = require('../controllers/reservation-controller');

// Create a new reservation
router.post('/reservation', ReservationController.createReservation);

// Get all reservations
router.get('/reservation', ReservationController.getReservations);

// Get reservation by ID
router.get('/reservation/:id', ReservationController.getReservationById);

// Update reservation by ID
router.put('/reservation/:id', ReservationController.updateReservation);

// Delete reservation by ID
router.delete('/reservation/:id', ReservationController.deleteReservation);

module.exports = router;