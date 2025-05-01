const express = require("express");
const router = express.Router();
const ReservationControlleurs = require("../controlleurs/ReservationControlleurs");

// Create a new reservation route post
router.post("/reservations", ReservationControlleurs.createReservation);

// Get all reservation route get
router.get("/reservations", ReservationControlleurs.getAllReservations);

// Get one reservation route get
router.get("/reservations/:id", ReservationControlleurs.getOneReservation);

// Delete one reservation route delete
router.delete("/reservations/:id", ReservationControlleurs.deleteOneReservation);

module.exports = router;