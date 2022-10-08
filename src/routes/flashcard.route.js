const router = require("express").Router();

const flashcardController = require("../controllers/flashcard.controller");
const isAuth = require("../middleware/isAuth");
const isUserFlashcard = require("../middleware/isUserFlashcard")

router.get("/", isAuth,  flashcardController.getAllFlashcards);

router.get("/:id", isAuth, flashcardController.getFlashcard);

router.post("/", isAuth, flashcardController.createFlashcard);

router.delete("/:id", isAuth, isUserFlashcard, flashcardController.deleteFlashcard)

router.put("/:id", isAuth, isUserFlashcard, flashcardController.updateFlashcard)

module.exports = router;
