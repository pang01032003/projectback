const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a new user
async function createUser(req, res) {
    const { firstName, lastName, phoneNumber, email, password } = req.body;
    try {
        const user = await prisma.user.create({
            data: {
                firstName,
                lastName,
                phoneNumber,
                email,
                password,
            },
        });
        res.status(201).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating user' });
    }
}

// Get all users
async function getUsers(req, res) {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error getting users' });
    }
}

// Get user by ID
async function getUserById(req, res) {
    const { id } = req.params;
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(id),
            },
        });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error getting user' });
    }
}

// Update user by ID
async function updateUser(req, res) {
    const { id } = req.params;
    const { firstName, lastName, phoneNumber, email, password } = req.body;
    try {
        const updatedUser = await prisma.user.update({
            where: {
                id: parseInt(id),
            },
            data: {
                firstName,
                lastName,
                phoneNumber,
                email,
                password,
            },
        });
        res.json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating user' });
    }
}

// Delete user by ID
async function deleteUser(req, res) {
    const { id } = req.params;
    try {
        await prisma.user.delete({
            where: {
                id: parseInt(id),
            },
        });
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error deleting user' });
    }
}

module.exports = {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
};