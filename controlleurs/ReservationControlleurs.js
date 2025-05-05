const Reservation = require("../models/Reservation")
const mongoose = require("mongoose")

const createReservation = async (req, res) => {
    try {

        const reservationData = {
            ...req.body,
            dateDepart: new Date(req.body.dateDepart),
            dateArrivee: new Date(req.body.dateArrivee)
          }

        const reservation = await Reservation.create(reservationData)
        res.status(201).json({
            success: true,
          data: reservation,
          message: "Réservation créée avec succès"
        })
        
        console.log("reservation created", reservation);
        
    } catch (error) {
        // res.status(500).json({ error: error.message })
        console.error("error serveur: ", error);

        if(error.name==="ValidationError"){
            const errors = Object.values(error.errors).map((el) => el.message)
            return res.status(400).json({message:"erreur de validation",
                 error})
        }
        
    }
}

// recupere toutes les reservations
const getAllReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find()
        res.status(200).json(reservations)
        console.log("reservations recuperer", reservations);
    } catch (error) {
        res.status(500).json({ error: error.message })
        console.error("error serveur: ", error);
    }
}

// recupere une reservation
const getOneReservation = async (req, res) => {
    const {id} = req.params
    console.log("id", id);

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "reservation introuvable"})
    }   
    
    try {
        const reservation = await Reservation.findById(id)
        res.status(200).json(reservation)
        console.log("reservation recuperer", reservation);

        if(!reservation){
            return res.status(404).json({error: "reservation introuvable"})
        }

    } catch (error) {
        res.status(500).json({ error: error.message })
        console.error("error serveur: ", error);
    }
}

// supprimer une reservation
const deleteOneReservation = async (req, res) => {
    const {id} = req.params
    console.log("id", id);

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "reservation introuvable"})
    }   
    
    try {
        const reservation = await Reservation.findByIdAndDelete(id)
        res.status(200).json(reservation)
        console.log("reservation supprimer", reservation);

        if(!reservation){
            return res.status(404).json({error: "reservation introuvable"})
        }

    } catch (error) {
        res.status(500).json({ error: error.message })
        console.error("error serveur: ", error);
    }
}



// export
module.exports = {
    createReservation,
    getAllReservations,
    getOneReservation,
    deleteOneReservation
}