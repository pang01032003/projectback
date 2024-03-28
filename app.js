require('dotenv').config()
const express = require('express')
const cors = require('cors')
const notFound = require('./middlewares/notFound')
const errorMiddleware = require('./middlewares/error')
const authRoute = require('./routes/auth-route')
const userRoute = require('./routes/user-rouye')
const reservationRoute = require('./routes/reservation-route')
const roomRoute = require('./routes/room-route');

const app = express()

app.use(cors());
app.use(express.json());

// service
app.use('/auth', authRoute);
app.use(userRoute);
app.use(reservationRoute);
app.use(roomRoute);

// notFound
app.use(notFound)

// error
app.use(errorMiddleware)

let port = process.env.PORT || 3000
app.listen(port, () => console.log('Server on Port :', port))