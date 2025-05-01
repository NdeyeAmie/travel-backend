const Reservation = require("../models/Reservation")

const createReservation = async (req, res) => {
    try {
        const reservation = await Reservation.create(req.body)
        res.status(201).json(reservation)
        console.log("reservation", reservation);
        
    } catch (error) {
        res.status(400).json({ error: error.message })
        res.status(500).json({ error: error.message })
        console.error("error serveur: ", error);
        
    }
}

module.exports = {
    createReservation
}