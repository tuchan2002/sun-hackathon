const router = require("express").Router();

const userController = require("../controllers/user.controller");
const isAuth = require("../middleware/isAuth");

router.get("/profile/:userId", userController.getUserProfile);

router.post("/profile", isAuth, userController.addUserProfile);

router.post("/hisroty", isAuth, userController.addUserActivity);

router.get("/hisroty", isAuth, userController.getUserHistory);

module.exports = router;
