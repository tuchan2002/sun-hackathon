require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("mongodb connected.");
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

connectDB();

app.use("/api", require("./routes/authRouter"));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server is running on port", port);
});
