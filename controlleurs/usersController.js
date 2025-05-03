const users = require("../models/users");
// const bcrypt = require("bcryptjs");


// creation d'un utilisateur
const createUsers = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // vérifier si l'utilisateur existe
        const userExist = await users.findOne({ email });
        if (userExist) return res.status(400).json({ message: "Email deja utilisé" });


        // creer l'utilisateur
        const user = await users.create({ username, email, password, role: "user" });

        // generer le token
        const token = user.generateToken();

        // renvoyer le token
        res.status(201).json({ 
             message: "Utilisateur créé",
             user: {
                 id: user._id,
                username,
                   email,
                   role: user.role
                } ,
                token
            });
            console.log("utilisateur créer", user);
            
    } catch (error) {
        console.error("erreur d'inscription", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
}

module.exports = {
     createUsers 
    }