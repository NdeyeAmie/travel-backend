const express = require("express");
const router = express.Router();
const userController = require("../controlleurs/usersController");

router.post("/users", userController.createUsers);


module.exports = router