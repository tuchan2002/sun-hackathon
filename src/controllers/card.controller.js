const Flashcard = require("../models/flashcardModel");
const Card = require("../models/cardModel");

const cardController = {
  deleteCard: async (req, res, next) => {
    try {
      await Card.findByIdAndDelete(req.params.id);
      const flashcard = await Flashcard.findById(req.query.flashcardId);
      const newCards = flashcard.Cards.filter((val) => {
        return val._id.toString() !== req.params.id;
      })
      console.log(newCards);
      flashcard.Cards = newCards;
      await flashcard.save();
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
    return res.status(201).json({
      message: "Delete card success.",
      success: true,
    });
  },
  updateCard: async (req, res, next) => {
    try {
      await Card.findByIdAndUpdate(req.params.id, {japaneseWord: req.body.japaneseWord, vietnameseWord: req.body.vietnameseWord});
      const newCard = await Card.findById(req.params.id);
      return res.status(201).json({
        message: "Update flashcard success",
        success: true,
        data: {
          newCard
        }
      });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  },
};



module.exports = cardController;
