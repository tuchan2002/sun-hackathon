const router = require("express").Router();

const postController = require("../controllers/postController");

router.get("/", postController.showPost);

router.post("/new", postController.createPost);

module.exports = router;