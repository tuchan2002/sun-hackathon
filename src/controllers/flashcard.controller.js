const Flashcard = require("../models/flashcardModel");
const Card = require("../models/cardModel");
const User = require("../models/userModel");

const flashcardController = {
    getAllFlashcards: async (req, res, next) => {
        try {
            const allFlashcard = await Flashcard.find()
                .populate("Cards")
                .populate({
                    path: "User",
                    select: "displayName avatar createdAt",
                });

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
    deleteFlashcard: async (req, res, next) => {
        try {
            const cardArray = Flashcard.findById(req.params.id).Cards;
            for (let card of cardArray) {
                await Card.findByIdAndDelete(card._id);
            }
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
        const flashcardId = req.params.flashcardId;
        const { title } = req.body;
        try {
            const flashcard = await Flashcard.findById(flashcardId);
            if (!flashcard) {
                const err = new Error("Could not find flashcard.");
                err.statusCode = 404;
                throw err;
            }

            const editedFlashcard = await Flashcard.updateOne(
                { _id: flashcardId },
                { title: title }
            );

            if (req.body.cards) {
                const savedFlashcard = await updateAllCard(
                    req.body.cards,
                    flashcard
                );
                return res.status(200).json({
                    message: "",
                    success: true,
                    data: {
                        savedFlashcard,
                    },
                });
            }

            res.status(200).json({
                message: "",
                success: true,
                data: {
                    editedFlashcard,
                },
            });
        } catch (err) {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        }
    },
    getFlashcardsByUserId: async (req, res, next) => {
        const userId = req.params.userId;
        try {
            const user = await User.findById(userId);
            if (!user) {
                const err = new Error("Could not find user.");
                err.statusCode = 404;
                throw err;
            }

            const flashcards = await Flashcard.find({
                User: userId,
            });

            if (!flashcards) {
                const err = new Error("Could not find flashcards by user.");
                err.statusCode = 404;
                throw err;
            }

            res.status(200).json({
                message: "",
                success: true,
                data: {
                    flashcards,
                },
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
    const limit = size ? +size : 8;
    const skip = page ? (+page - 1) * limit : 0;
    return { limit, skip };
};

const savedManyCard = async (cards) => {
    const cardsDoc = cards.map((val) => {
        console.log(val);
        return new Card(val);
    });
    console.log(cardsDoc);
    try {
        const cardsSaved = await Card.bulkSave(cardsDoc);

        return Object.keys(cardsSaved.insertedIds).map((key) =>
            cardsSaved.insertedIds[key].toString()
        );
    } catch (err) {
        throw err;
    }
};

const updateAllCard = async (cards, flashcard) => {
    try {
        const deleteCards = flashcard.Cards.map((val) => {
            return Card.findByIdAndDelete(val);
        });

        await Promise.all(deleteCards);

        const cardsId = await savedManyCard(cards);
        flashcard.Cards = cardsId;
        const savedFlashcard = await flashcard.save();
        return savedFlashcard;
    } catch (err) {
        throw err;
    }
};

module.exports = flashcardController;
