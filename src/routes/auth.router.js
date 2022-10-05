const router = require("express").Router();

const authController = require("../controllers/auth.controller");
const authValidation = require("../middleware/auth.validation");

router.post("/register", authValidation, authController.register);

router.post("/login", authValidation, authController.login);

router.post("/logout", authController.logout);

router.post("/refresh_token", authController.generateAccessToken);

module.exports = router;
