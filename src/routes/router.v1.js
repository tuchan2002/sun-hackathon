const express = require("express");

const authRoute = require("./auth.router");
const uploadRoute = require("./upload.route");
const quizRoute = require("./quiz.route");
const questionRoute = require("./question.route");

const appRoute = express();

appRoute.get("/home/:token", (req, res) => {
  res.status(200).json({
    message: "new password",
    token: req.params.token,
  });
});

appRoute.use("/auth", authRoute);

appRoute.use("/upload", uploadRoute);

appRoute.use("/quiz", quizRoute);

appRoute.use("/question", questionRoute);

module.exports = appRoute;
