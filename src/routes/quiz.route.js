const router = require("express").Router();

const quizController = require("../controllers/quiz.controller");
const isAuth = require("../middleware/isAuth");

router.get("/", quizController.getAllQuiz);

router.get("/:quizId", quizController.getAQuiz);

router.get("/user/:userId", quizController.getQuizzesByUserId);

router.post("/", isAuth, quizController.addQuiz);

router.put("/:quizId", isAuth, quizController.editQuiz);

router.delete("/:quizId", isAuth, quizController.deleteQuiz);

module.exports = router;
