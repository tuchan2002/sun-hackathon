const Questions = require("../models/questionModel");
const Quizzes = require("../models/quizModel");

const addQuestion = async (req, res, next) => {
  console.log(req.body);
  const question = new Questions({
    content: req.body.content,
    answers: req.body.answers,
    result: req.body.result,
  });

  console.log(question);
  try {
    const quesSaved = await question.save();

    res.status(200).json({
      message: "",
      success: true,
      data: {
        quesSaved,
      },
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const editQuestion = async (req, res, next) => {
  const questionId = req.params.questionId;

  const { content, answers, result } = req.body;
  try {
    const question = await Questions.findById(questionId);
    if (!question) {
      const err = new Error("Could not find question.");
      err.statusCode = 404;
      throw err;
    }

    const editedQuestion = await Questions.updateOne(
      { _id: questionId },
      { content: content, answers: answers, result: result }
    );

    res.status(200).json({
      message: "",
      success: true,
      data: {
        editedQuestion,
      },
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const deleteQuestion = async (req, res, next) => {
  const questionId = req.params.questionId;
  const quizId = req.query.quizId;
  try {
    const question = await Questions.findById(questionId);
    if (!question) {
      const err = new Error("Could not find question.");
      err.statusCode = 404;
      throw err;
    }
    const quiz = await Quizzes.findById(quizId);
    if (!quiz) {
      const err = new Error("Could not find quiz.");
      err.statusCode = 404;
      throw err;
    }
    console.log(quiz);
    if (quiz.user.toString() !== req.userId) {
      const err = new Error("No editing permission.");
      err.statusCode = 400;
      throw err;
    }

    const newQuestions = quiz.questions.filter((val) => {
      return val._id.toString() !== questionId;
    });

    quiz.questions = newQuestions;

    await quiz.save();
    const deletedQuestion = await Questions.findByIdAndDelete(questionId);

    res.status(200).json({
      message: "",
      success: true,
      data: {
        deletedQuestion,
      },
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const questionController = {
  addQuestion,
  editQuestion,
  deleteQuestion,
};

module.exports = questionController;
