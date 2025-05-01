const express = require("express");
const router = express.Router();
const ReservationControlleurs = require("../controlleurs/ReservationControlleurs");

router.post("/", ReservationControlleurs.createReservation);

module.exports = router;