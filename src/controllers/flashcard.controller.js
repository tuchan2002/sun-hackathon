const Flashcard = require("../models/flashcardModel");
const Card = require("../models/cardModel");

const flashcardController = {
  getAllFlashcards: async (req, res, next) => {
    try {
      const page = req.query.page;
      if(+page<=0) {
        page = 1;
      }
      const amount = await Flashcard.count();
      const links = [];

    const pages = amount / 6;
    for (let i = 1; i <= pages + 1; i++) {
      links.push({
        url: `http://localhost:8080/api/v1/flashcards?page=${i}`,
        label: `${i}`,
      });
    }

    const pageOption = getPagination(page);
    const allFlashcard = await Flashcard.find()
      .skip(pageOption.skip)
      .limit(pageOption.limit)
      .populate("Cards");

      if (!allFlashcard) {
        const err = new Error("Can not find any flashcard");
        err.statusCode = 404;
        throw err;
      }
      return res.status(201).json({
        message: "Find all flashcards success.",
        success: true,
        data: {
          allFlashcard,
          links
        },
      });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  },
  getFlashcard: async (req, res, next) => {
    try {
      const flashcard = await Flashcard.findById(req.params.id).populate(
        "Cards"
      );
      if (!flashcard) {
        const err = new Error("Can not find flashcard");
        err.statusCode = 404;
        throw err;
      }
      return res.status(201).json({
        message: "Find flashcard success.",
        success: true,
        data: {
          flashcard,
        },
      });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  },
  createFlashcard: async (req, res, next) => {
    try {
      const flashcard = new Flashcard();
      flashcard.User = req.userId;
      flashcard.title = req.body.title;
      const cardArray = req.body.Cards;
      for (let card of cardArray) {
        let newCard = await Card.create({
          japaneseWord: card.japaneseWord,
          vietnameseWord: card.vietnameseWord,
        });
        flashcard.Cards.push(newCard._id);
      }
      await flashcard.save();
      return res.status(201).json({
        message: "Create flashcard success",
        success: true,
        data: flashcard,
      });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  },
  deleteFlashcard: async (req, res, next) => {
    try {
      await Flashcard.findByIdAndDelete(req.params.id);
      return res.status(201).json({
        message: "Delete flashcard success.",
        success: true,
      });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  },
  updateFlashcard: async (req, res, next) => {
    try {
      if (!req.body.Cards) {
        await Flashcard.findByIdAndUpdate(req.params.id, {
          title: req.body.title,
        });
      } else {
        const newFlashcard = new Flashcard();
        newFlashcard.User = req.body.User;
        newFlashcard.title = req.body.title;
        const cardArray = req.body.Cards;
        for (let card of cardArray) {
          let newCard = await Card.create({
            japaneseWord: card.japaneseWord,
            vietnameseWord: card.vietnameseWord,
          });
          newFlashcard.Cards.push(newCard._id);
        }
        await Flashcard.findByIdAndUpdate(req.params.id, newFlashcard);
      }
      const newFlashcard = await Flashcard.findById(req.params.id);
      return res.status(201).json({
        message: "Update flashcard success",
        success: true,
        data: {
          newFlashcard
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

const getPagination = (page, size) => {
  if (page <= 0) page = 1;
  const limit = size ? +size : 6;
  const skip = page ? (+page - 1) * limit : 0;
  return { limit, skip };
};

module.exports = flashcardController;
