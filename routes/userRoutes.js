const express = require("express");
const User = require("../models/Users.js");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { protect } = require("../middleware/authMiddleware");

//inscription
router.post("/register", async (req, res) => {
    console.log("🔔 Route /api/users/register hit", req.body);
  const { username, email, password } = req.body;

  try {
    const userExist = await User.findOne({ email });
    if (userExist) return res.status(400).json({ message: "Email déjà utilisé" });

    const user = await User.create({ username, email, password });
    const token = user.generateToken();

    res.status(201).json({ token, user: { id: user._id, username, email } });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

//get users
router.get("/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
