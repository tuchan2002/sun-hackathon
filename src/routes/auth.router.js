const router = require("express").Router();

const authController = require("../controllers/auth.controller");
const authValidation = require("../middleware/auth.validation");
const isAuth = require("../middleware/isAuth");

router.post("/register", authValidation, authController.register);

router.post("/login", authValidation, authController.login);

router.post("/logout", authController.logout);

router.post("/refresh_token", authController.generateAccessToken);

router.post("/forgot_password", authController.resetPassword);

router.post("/new_password", authController.newPassword);

router.post("/change_password", isAuth, authController.changePassword);

module.exports = router;
