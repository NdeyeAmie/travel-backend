const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db.js");
const reservationRoutes = require("./routes/ReservationsRoutes");
const UsersRoutes = require("./routes/userRoutes.js");
const volsRoutes = require("./routes/volsRoutes.js")
const fs = require("fs")

// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('swagger-jsdoc');

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/reservations",reservationRoutes);
app.use(UsersRoutes);
app.use("/api/vols",volsRoutes)

connectDB()
.then(() => {
    app.listen(process.env.DB_PORT, () => {
      console.log(`Server running on port ${process.env.DB_PORT}`);
    });
  });