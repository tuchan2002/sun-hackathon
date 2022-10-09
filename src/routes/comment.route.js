const router = require("express").Router();
const commentController = require("../controllers/comment.controller");

router.route("/:postId").get(commentController.getCommentsByPostId);

module.exports = router;
