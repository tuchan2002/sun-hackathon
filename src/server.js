const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const appRouteV1 = require("./routes/router.v1");

const port = process.env.PORT || 5000;
const app = express();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "res/images");
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(bodyParser.json());
app.use(helmet());
app.use(cors());
app.use(morgan("common"));
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).array("image")
);
app.use(cookieParser());

app.use("/res/images", express.static(path.join(__dirname, "res", "images")));

app.use("/api/v1", appRouteV1);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({
    message: message,
    success: false,
    data: data,
  });
});

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI_THINH);
    console.log("mongodb connected.");
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};
connectDB();

app.listen(port, () => {
  console.log("Server is running on port", port);
});
