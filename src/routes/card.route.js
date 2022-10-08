const router = require("express").Router();
const isAuth = require("../middleware/isAuth");
const isUserCard = require("../middleware/isUserCard")

const cardController = require("../controllers/card.controller");

router.delete("/:id", isAuth, isUserCard,  cardController.deleteCard);

router.put("/:id", isAuth, isUserCard, cardController.updateCard);

module.exports = router;
