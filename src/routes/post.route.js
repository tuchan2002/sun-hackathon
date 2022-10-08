const router = require("express").Router();

const postController = require("../controllers/post.controller");
const isAuth = require("../middleware/isAuth");
const isUserPost = require("../middleware/isUserPost");

router.get("/", isAuth,  postController.getAllPost);

router.get("/:id", isAuth, postController.getPost);

router.post("/", isAuth, postController.createPost);

router.delete("/:id", isAuth, isUserPost, postController.deletePost);

router.put("/:id", isAuth, isUserPost, postController.updatePost);

module.exports = router;
