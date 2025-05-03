const User = require("../models/Users.js");
// const bcrypt = require("bcryptjs");


// creation d'un utilisateur
const createUsers = async (req, res) => {
    try {
        const { prenom, nom, email, password , isAdmin} = req.body;

        // vérifier si l'utilisateur existe
        const userExist = await User.findOne({ email });
        if (userExist) return res.status(400).json({ message: "Email deja utilisé" });

        // const hashedPassword = await bcrypt.hash(password, 10);

        // creer l'utilisateur
        const user = await User.create({ prenom, nom , email, password, isAdmin });

        // generer le token
        const token = user.generateToken();

        // renvoyer le token
        res.status(201).json({ 
             message: "Utilisateur créé",
             user: {
                 id: user._id,
                prenom,
                nom,
                email,
                isAdmin
                } ,
                token
            });
            console.log("utilisateur créer", user);
            
    } catch (error) {
        console.error("erreur d'inscription", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
}

const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
   
      // Chercher l'utilisateur
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: "Email ou mot de passe incorrect" });
  
      // Vérifier le mot de passe
      const isMatch = await user.matchPassword(password);
      if (!isMatch) return res.status(400).json({ message: "Email ou mot de passe incorrect" });
  
      // Générer le token
      const token = user.generateToken();
  
      // Renvoyer les infos utilisateur (sans le mot de passe)
      res.json({
        message: "Connexion réussie",
        user: {
          id: user._id,
          prenom: user.prenom,
          nom: user.nom,
          email: user.email,
          isAdmin: user.isAdmin,
        },
        token,
      });
      console.log("utilisateur recuperér", user);
    } catch (error) {
      console.error("Erreur lors du login :", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  };
  
//GET users
const getUserProfile = async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select("-password");
      if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });
  
      res.json(user);
    } catch (error) {
      console.error("Erreur récupération profil :", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  };
  
//UPDATE
  const updateUserProfile = async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });
  
      // Mise à jour des champs si présents
      user.prenom = req.body.prenom || user.prenom;
      user.nom = req.body.nom || user.nom;
      user.email = req.body.email || user.email;
  
      if (req.body.password) {
        user.password = req.body.password; // sera hashé via le pre("save")
      }
  
      const updatedUser = await user.save();
      const token = updatedUser.generateToken();
  
      res.json({
        message: "Profil mis à jour",
        user: {
          id: updatedUser._id,
          prenom: updatedUser.prenom,
          nom: updatedUser.nom,
          email: updatedUser.email,
          isAdmin: updatedUser.isAdmin,
        },
        token,
      });
    } catch (error) {
      console.error("Erreur mise à jour :", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  };
   

//GET All users
const getAllUsers = async (req, res) => {
    try {
      const users = await User.find().select("-password"); // sans les mots de passe
      res.json(users);
    } catch (error) {
      console.error("Erreur récupération des utilisateurs :", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  };
  


//DELETE   
const deleteUser = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });
  
      await user.deleteOne();
      res.json({ message: "Utilisateur supprimé avec succès" });
    } catch (error) {
      console.error("Erreur suppression utilisateur :", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  };
  


module.exports = {
     createUsers ,
     loginUser,
     getUserProfile,
     updateUserProfile,
     getAllUsers,
     deleteUser
    }