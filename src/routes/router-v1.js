const express = require("express");
const authRoute = require("./auth.router");
const postRoute = require("./postRoute");
const appRoute = express();

appRoute.use("/auth", authRoute);

appRoute.use("/posts", postRoute);

module.exports = appRoute;
