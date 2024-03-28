const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a new reservation
exports.createReservation = async(req, res) => {
    const { date, timeStart, timeEnd, userId, roomId } = req.body;
    try {
        const reservation = await prisma.reservation.create({
            data: {
                date,
                timeStart,
                timeEnd,
                userId,
                roomId,
            },
        });
        res.status(201).json(reservation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating reservation' });
    }
};

// Get all reservations
exports.getReservations = async(req, res) => {
    try {
        const reservations = await prisma.reservation.findMany();
        res.json(reservations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error getting reservations' });
    }
};

// Get reservation by ID
exports.getReservationById = async(req, res) => {
    const { id } = req.params;
    try {
        const reservation = await prisma.reservation.findUnique({
            where: {
                id: parseInt(id),
            },
        });
        if (!reservation) {
            return res.status(404).json({ error: 'Reservation not found' });
        }
        res.json(reservation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error getting reservation' });
    }
};

// Update reservation by ID
exports.updateReservation = async(req, res) => {
    const { id } = req.params;
    const { date, timeStart, timeEnd, userId, roomId } = req.body;
    try {
        const updatedReservation = await prisma.reservation.update({
            where: {
                id: parseInt(id),
            },
            data: {
                date,
                timeStart,
                timeEnd,
                userId,
                roomId,
            },
        });
        res.json(updatedReservation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating reservation' });
    }
};

// Delete reservation by ID
exports.deleteReservation = async(req, res) => {
    const { id } = req.params;
    try {
        await prisma.reservation.delete({
            where: {
                id: parseInt(id),
            },
        });
        res.json({ message: 'Reservation deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error deleting reservation' });
    }
};