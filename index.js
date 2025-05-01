const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db.js");
const reservationRoutes = require("./routes/ReservationsRoutes");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(reservationRoutes);


connectDB()
.then(() => {
    app.listen(process.env.DB_PORT, () => {
      console.log(`Server running on port ${process.env.DB_PORT}`);
    });
  });
