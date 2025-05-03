const express = require("express");
const router = express.Router();
const ReservationControlleurs = require("../controlleurs/ReservationControlleurs");

// Create a new reservation route post
// Post api/reservations
router.post("/", ReservationControlleurs.createReservation);

// Get all reservation route get
router.get("/", ReservationControlleurs.getAllReservations);

// // Get one reservation route get
router.get("/:id", ReservationControlleurs.getOneReservation);

// // Delete one reservation route delete
router.delete("/:id", ReservationControlleurs.deleteOneReservation);

module.exports = router;