const express = require('express');
const router = express.Router();
const PaymentController = require('../controllers/paymet-controller');

// Create a new payment
router.post('/paymet', PaymentController.createPayment);

// Get all payments
router.get('/paymet', PaymentController.getPayments);

// Get payment by ID
router.get('/paymet/:id', PaymentController.getPaymentById);

// Update payment by ID
router.put('/paymet/:id', PaymentController.updatePayment);

// Delete payment by ID
router.delete('/paymet/:id', PaymentController.deletePayment);

module.exports = router;