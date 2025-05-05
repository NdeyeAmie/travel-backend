const mongoose = require("mongoose");

const volSchema = new mongoose.Schema({
  aeroportArrivee: String,
  aeroportArrivee: String,
  dateDepart: Date,
  dateArrivee: Date,
  heureDepart: String,
  heureArrivee: String,
  compagnie: String,
  numeroVol: String,
  prix: Number,
  duree: String,
  places: Number,
});

module.exports = mongoose.model("Vol", volSchema);
