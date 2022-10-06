const express = require("express");

const authRoute = require("./auth.router");
const uploadRoute = require("./upload.route");

const appRoute = express();

appRoute.get("/home/:token", (req, res) => {
  res.status(200).json({
    message: "new password",
    token: req.params.token,
  });
});

appRoute.use("/upload", uploadRoute);

appRoute.use("/auth", authRoute);

module.exports = appRoute;
