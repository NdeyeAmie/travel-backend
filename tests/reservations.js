const request = require('supertest');
const app = require('../server');
const Reservation = require('../models/Reservation');

app.use('/api/reservations', require('../routes/ReservationsRoutes'));


