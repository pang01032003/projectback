const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const password = bcrypt.hashSync('123456');
const userData = [
    { role: 'USER', firstName: 'Andy123', lastName: 'Andy', phoneNumber: '0970687203', email: 'andy@ggg.mail', password, },
    { role: 'USER', firstName: 'Bobby123', lastName: 'Bobby', phoneNumber: '0649129673', email: 'bobby@ggg.mail', password, },
    { role: 'USER', firstName: 'Candy123', lastName: 'candy', phoneNumber: '0611214879', email: 'candy@ggg.mail', password, },


];

const run = async() => {
    await prisma.user.createMany({
        data: userData
    })
}

run()