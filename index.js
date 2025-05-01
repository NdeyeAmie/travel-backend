const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db.js");
const userRoutes = require("./routes/userRoutes.js")

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());



app.use("/api/users", userRoutes);


connectDB()
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

