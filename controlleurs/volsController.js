const generateVolsDynamiques = require("../services/generatesVols");
const volsModel = require("../models/volsModel");

const getVols = async (req, res) => {
  try {
    const volsFromDb = await volsModel.find();
    const volsDynamiques = generateVolsDynamiques(volsFromDb);
    res.status(200).json(volsDynamiques);
  } catch (err) {
    res.status(500).json({ message: "erreur serveur" });
    console.error("Erreur lors de la récupération des vols", err.message);
  }
};
 

module.exports={
    getVols
}