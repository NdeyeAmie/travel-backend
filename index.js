const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db.js");
const app = express();
const reservationRoutes = require("./routes/ReservationsRoutes");
const userRoutes = require("./routes/userRoutes.js")

dotenv.config();
app.use(express.json());
app.use(cors());
app.use(reservationRoutes);



app.use("/api/users", userRoutes);
app.use("/api/users/register", userRoutes);



connectDB().then(() => {
  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => {
    console.log(`Serveur lancé sur le port ${PORT}`);
  });
})

