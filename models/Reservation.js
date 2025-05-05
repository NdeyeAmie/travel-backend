const mongoose = require("mongoose");

// const reservationSchema = new mongoose.Schema({
//     // infos des client
//     nom: {
//         type: String,
//         required: true,
//         trim: true,
//         maxlength: 50
//     },
//     prenom: {
//         type: String,
//         required: true,
//         trim: true,
//         maxlength: 50
//     },
//     email: {
//         type: String,
//         required: true,
//         trim: true,
//         lowercase: true,
//         match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
//     },
//     telephone: {
//         type: String,
//         required: true,
//         match: [/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im, 'Please fill a valid phone number']
//     },
//     // infos des vols
//     vol:{
//         numeroVols: {
//             type: String,
//             required: true,
//             uppercase: true,
//             match: [/^[A-Z]{2}[0-9]{3}$/, 'Please fill a valid vol number']
//         },
//         compagnie: {
//             type: String,
//             required: true,
//             enum: ['Ryanair', 'Air France', 'Lufthansa',
//                  'Emirates', 'British Airways', 'Turkish Airlines', 
//                  'Turkish Airlines', 'Turkish Airlines', 'Turkish Airlines',
//                   'Turkish Airlines', 'Turkish Airlines','Air Senegal', 'Yassir Sn']
//         },
//         depart:{
//             villeDepart: {
//                 type: String,
//                 required: true
//             },
//             dateDepart: {
//                 type: Date,
//                 required: true
//             },
//             aeroportDepart: {
//                 type: String,
//                 // required: true
//             }
//         },
//         arrivee: {
//             villeArrivee: {
//                 type: String,
//                 required: true
//             },
//             dateArrivee: {
//                 type: Date,
//                 required: true
//             },
//             aeroportArrivee: {
//                 type: String,
//                 // required: true
//             }
//         },
//         classe: {
//             type: String,
//             required: true,
//             enum: ['Economy', 'Business', 'First'],
//             default: 'Economy'
//         },
//         prix: {
//             type: Number,
//             // required: true
//         },
//         // metadonnes
//         dateReservation: {
//             type: Date,
//             default: Date.now
//         },
//         statut: {
//             type: String,
//             required: true,
//             enum: ['En attente', 'Confirmer', 'Annuler'],
//             default: 'En attente'
//         },
//         duree: {
//             type: String,
//             // required: true
//         }
//     }
    
// })
// const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  // Informations personnelles
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  email: { 
    type: String, 
    required: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email invalide']
  },
  telephone: { type: String, required: true },

  // Informations sur le vol
  villeDepart: { type: String, required: true },
  villeArrivee: { type: String, required: true },
  dateDepart: { type: Date, required: true },
  dateArrivee: { type: Date, required: true },
  heureDepart: { type: String, required: true },
  heureArrivee: { type: String, required: true },
  compagnie: { type: String, required: true },
  numeroVol: { type: String, required: true },
  prix: { 
    type: Number, 
    required: true,
    min: [0, 'Le prix ne peut pas être négatif']
  },
//   duree: { type: String, required: true },
  
  // Métadonnées
  statut: { 
    type: String, 
    enum: ['en attente', 'confirmée', 'annulée'],
    default: 'en attente'
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Index pour améliorer les performances de recherche
reservationSchema.index({ numeroVol: 1, createdAt: -1 });

// module.exports = mongoose.model('Reservation', reservationSchema);

module.exports = mongoose.model('Reservation', reservationSchema)