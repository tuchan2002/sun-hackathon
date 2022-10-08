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
const cron = require("node-cron");

const remind = require("./helpers/remindLearn");

const appRouteV1 = require("./routes/router.v1");

const port = process.env.PORT || 5000;
const app = express();

// cron.schedule("* * * * *", remind);

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

const http = require("http").createServer(app);
const io = require("socket.io")(http);

let users = [];
io.on("connection", (socket) => {
  console.log(socket.id + " connected!");

  // lang nghe du lieu tu client
  socket.on("joinRoom", ({ userId, roomId }) => {
    console.log("userId, roomId ", userId, roomId);
    const user = { userId: userId, roomId: roomId };
    console.log(0, users);
    const check = users.every((user) => user.userId !== userId);
    console.log("check", check);
    if (check) {
      users.push(user);
      console.log(1);
      socket.join(user.roomId); // user hien tai se join vao room
    } else {
      users.map((user) => {
        if (user.userId === userId) {
          console.log(0.5);
          if (user.roomId !== roomId) {
            socket.leave(user.roomId);
            console.log(2);
            socket.join(roomId);
            user.roomId = roomId;
          }
        }
      });
    }
    console.log("users array", users);
    console.log(socket.adapter.rooms);
  });

  socket.on("createComment", async (data) => {
    console.log("datadata", data);
    const { title, content, postId, createdAt } = data;

    const newComment = new Comments({
      title,
      content,
      postId,
      createdAt,
    });

    await newComment.save();
    console.log("newComment.product_id", newComment.product_id);
    console.log("users array", users);
    console.log(socket.adapter.rooms);

    io.to(newComment.product_id).emit("sendCommentToClient", newComment);
  });

  socket.on("disconnect", () => {
    console.log(socket.id + " disconnected!");
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

http.listen(port, () => {
  console.log("Server is running on port", port);
});
