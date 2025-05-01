const express = require("express");
const router = express.Router();
const ReservationControlleurs = require("../controlleurs/ReservationControlleurs");

// Create a new reservation route post
router.post("/reservations", ReservationControlleurs.createReservation);


const url ='http://localhost:3000/reservations'
module.exports = router;