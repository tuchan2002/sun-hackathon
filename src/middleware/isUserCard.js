const Flashcard = require("../models/flashcardModel");

const isUserCard = async (req, res, next) => {
  try {
    const flashcard = await Flashcard.findById(req.query.flashcardId);
    if (!flashcard.User.equals(req.userId)) {
      const err = new Error("You is not author");
      err.statusCode = 404;
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

module.exports = isUserCard;