const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a new room
exports.createRoom = async(req, res) => {
    const { roomName, capacity, price, status } = req.body;
    try {
        const room = await prisma.room.create({
            data: {
                roomName,
                capacity,
                price,
                status,
            },
        });
        res.status(201).json(room);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating room' });
    }
};

// Get all rooms
exports.getRooms = async(req, res) => {
    try {
        const rooms = await prisma.room.findMany();
        res.json(rooms);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error getting rooms' });
    }
};

// Get room by ID
exports.getRoomById = async(req, res) => {
    const { id } = req.params;
    try {
        const room = await prisma.room.findUnique({
            where: {
                id: parseInt(id),
            },
        });
        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }
        res.json(room);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error getting room' });
    }
};

// Update room by ID
exports.updateRoom = async(req, res) => {
    const { id } = req.params;
    const { roomName, capacity, price, status } = req.body;
    try {
        const updatedRoom = await prisma.room.update({
            where: {
                id: parseInt(id),
            },
            data: {
                roomName,
                capacity,
                price,
                status,
            },
        });
        res.json(updatedRoom);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating room' });
    }
};

// Delete room by ID
exports.deleteRoom = async(req, res) => {
    const { id } = req.params;
    try {
        await prisma.room.delete({
            where: {
                id: parseInt(id),
            },
        });
        res.json({ message: 'Room deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error deleting room' });
    }
};