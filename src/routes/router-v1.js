const express = require("express");
const authRoute = require("./auth.router");

const appRoute = express();

appRoute.use("/auth", authRoute);

module.exports = appRoute;
