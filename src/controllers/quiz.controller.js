const Quizzes = require("../models/quizModel");
const Questions = require("../models/questionModel");

const getAllQuiz = async (req, res, next) => {
  try {
    const allQuiz = await Quizzes.find().populate("questions");

    res.status(201).json({
      message: "",
      success: true,
      data: {
        allQuiz,
      },
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const getAQuiz = async (req, res, next) => {
  const quizId = req.params.quizId;
  try {
    const quiz = await Quizzes.findById(quizId).populate("questions");
    if (!quiz) {
      const err = new Error("Could not find quiz.");
      err.statusCode = 404;
      throw err;
    }

    res.status(201).json({
      message: "",
      success: true,
      data: {
        quiz,
      },
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const addQuiz = async (req, res, next) => {
  const { title, questions } = req.body;

  try {
    const questionsId = await savedManyQuestion(questions);

    const newQuiz = new Quizzes({
      title: title,
      user: req.userId,
      questions: questionsId,
    });

    const quizSaved = await newQuiz.save();

    res.status(200).json({
      message: "",
      success: true,
      data: {
        quizSaved,
      },
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const editQuiz = async (req, res, next) => {
  const quizId = req.params.quizId;

  const { title } = req.body;
  try {
    const quiz = await Quizzes.findById(quizId);
    if (!quiz) {
      const err = new Error("Could not find quiz.");
      err.statusCode = 404;
      throw err;
    }

    if (quiz.user.toString() !== req.userId) {
      const err = new Error("No editing permission.");
      err.statusCode = 400;
      throw err;
    }

    const editedQuiz = await Quizzes.updateOne(
      { _id: quizId },
      { title: title }
    );

    if (req.body.questions) {
      const savedQuiz = await updateAllQuestion(req.body.questions, quiz);
      return res.status(200).json({
        message: "",
        success: true,
        data: {
          savedQuiz,
        },
      });
    }

    res.status(200).json({
      message: "",
      success: true,
      data: {
        editedQuiz,
      },
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const deleteQuiz = async (req, res, next) => {
  const quizId = req.params.quizId;
  try {
    const quiz = await Quizzes.findById(quizId);
    if (!quiz) {
      const err = new Error("Could not find quiz.");
      err.statusCode = 404;
      throw err;
    }

    if (quiz.user.toString() !== req.userId) {
      const err = new Error("No deleting permission.");
      err.statusCode = 400;
      throw err;
    }

    const deleteQus = quiz.questions.map((val) => {
      console.log(val);
      return Questions.findByIdAndDelete(val);
    });

    await Promise.all(deleteQus);

    const deletedQuiz = await Quizzes.findByIdAndDelete(quizId);

    res.status(200).json({
      message: "",
      success: true,
      data: {
        deletedQuiz,
      },
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const savedManyQuestion = async (questions) => {
  const questionsDoc = questions.map((val) => {
    return new Questions(val);
  });
  try {
    const questionsSaved = await Questions.bulkSave(questionsDoc);

    return Object.keys(questionsSaved.insertedIds).map((key) =>
      questionsSaved.insertedIds[key].toString()
    );
  } catch (err) {
    throw err;
  }
};

const updateAllQuestion = async (questions, quiz) => {
  try {
    const deleteQus = quiz.questions.map((val) => {
      console.log(val);
      return Questions.findByIdAndDelete(val);
    });

    await Promise.all(deleteQus);

    const questionsId = await savedManyQuestion(questions);
    quiz.questions = questionsId;
    const sevedQuiz = await quiz.save();
    return sevedQuiz;
  } catch (err) {
    throw err;
  }
};

const quizController = {
  getAllQuiz,
  getAQuiz,
  addQuiz,
  editQuiz,
  deleteQuiz,
};

module.exports = quizController;
