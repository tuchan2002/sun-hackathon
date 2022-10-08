const Flashcard = require("../models/flashcardModel");

const isUserFlashcard = async (req, res, next) => {
  try {
    const flashcard = await Flashcard.findById(req.params.flashcardId);
    if (!flashcard.User.equals(req.userId)) {
      const err = new Error("You is not author");
      err.statusCode = 403;
      throw err;
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
  next();
};

module.exports = isUserFlashcard;
