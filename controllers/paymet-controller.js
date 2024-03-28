const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a new payment
exports.createPayment = async(req, res) => {
    const { paymentDate, amount, methodPayment, reservationId, userId } = req.body;
    try {
        const payment = await prisma.payment.create({
            data: {
                paymentDate,
                amount,
                methodPayment,
                reservationId,
                userId,
            },
        });
        res.status(201).json(payment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating payment' });
    }
};

// Get all payments
exports.getPayments = async(req, res) => {
    try {
        const payments = await prisma.payment.findMany();
        res.json(payments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error getting payments' });
    }
};

// Get payment by ID
exports.getPaymentById = async(req, res) => {
    const { id } = req.params;
    try {
        const payment = await prisma.payment.findUnique({
            where: {
                id: parseInt(id),
            },
        });
        if (!payment) {
            return res.status(404).json({ error: 'Payment not found' });
        }
        res.json(payment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error getting payment' });
    }
};

// Update payment by ID
exports.updatePayment = async(req, res) => {
    const { id } = req.params;
    const { paymentDate, amount, methodPayment, reservationId, userId } = req.body;
    try {
        const updatedPayment = await prisma.payment.update({
            where: {
                id: parseInt(id),
            },
            data: {
                paymentDate,
                amount,
                methodPayment,
                reservationId,
                userId,
            },
        });
        res.json(updatedPayment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating payment' });
    }
};

// Delete payment by ID
exports.deletePayment = async(req, res) => {
    const { id } = req.params;
    try {
        await prisma.payment.delete({
            where: {
                id: parseInt(id),
            },
        });
        res.json({ message: 'Payment deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error deleting payment' });
    }
};