const router = require("express").Router();

const questionController = require("../controllers/question.controller");
const isAuth = require("../middleware/isAuth");

router.put("/:questionId", questionController.editQuestion);

router.delete("/:questionId", isAuth, questionController.deleteQuestion);

module.exports = router;
