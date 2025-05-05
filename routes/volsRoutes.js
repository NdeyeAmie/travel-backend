const express = require("express");
const router = express.Router();
const generateVolsDynamiques = require("../services/generatesVols");
const volsControllers = require("../controlleurs/volsController.js")

router.get("/",volsControllers.getVols)

module.exports = router;
