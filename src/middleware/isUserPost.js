const Post = require("../models/postModel");

const isUserPost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post.User.equals(req.userId)) {
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

module.exports = isUserPost;