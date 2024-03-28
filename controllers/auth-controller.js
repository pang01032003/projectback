const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.register = async(req, res, next) => {
    const { firstName, lastName, phoneNumber, email, password, confirmPassword, role } = req.body;
    try {
        // Validation
        if (!(firstName && lastName && phoneNumber && email && password && confirmPassword && role)) {
            throw new Error("Please fill in all fields");
        }
        if (password !== confirmPassword) {
            throw new Error("Passwords do not match");
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 8);

        // Create user in the database
        const user = await prisma.user.create({
            data: {
                firstName,
                lastName,
                phoneNumber,
                email,
                password: hashedPassword,
                role
            }
        });

        res.json({ msg: 'Registration successful' });
    } catch (err) {
        next(err);
    }
};

exports.login = async(req, res, next) => {
    const { email, password } = req.body;
    console.log(req.body);
    try {
        // validation
        if (!(email && password)) {
            throw new Error('Email and password must be provided');
        }
        // find user in the database
        const user = await prisma.user.findUnique({
            where: { email },
        });
        console.log('user', user);
        if (!user) {
            throw new Error('User not found');
        }
        // check password
        const pwOk = await bcrypt.compare(password, user.password);
        if (!pwOk) {
            throw new Error('Invalid login credentials');
        }

        // Assuming login is successful, generate a JWT token
        const token = jwt.sign({ userId: user.id }, 'your_secret_key_here');

        // Return the token
        res.json({ token });
    } catch (error) {
        next(error);
    }
};

exports.getme = async(req, res, next) => {
    try {
        const userId = req.user.id;
        console.log('userId22', userId);
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });
        console.log('user11', user);
        delete user.password;
        console.log('user22', user);
        if (!user) {
            throw new Error('User not found');
        }
        res.json(user);
    } catch (err) {
        next(err);
    }
};