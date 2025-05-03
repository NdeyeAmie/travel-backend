const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware")
const {createUsers,
        loginUser, 
        getUserProfile , 
        updateUserProfile,
        getAllUsers,
        deleteUser
    } = require("../controlleurs/usersController");

router.post("/api/users/register", createUsers);

router.post("/api/users/login", loginUser);

router.get("/api/users/profile", protect, getUserProfile);

router.put("/api/users/update", protect, updateUserProfile);

router.get("/api/users/allusers", protect, getAllUsers);

router.delete("/api/users/:id", protect, deleteUser);




module.exports = router