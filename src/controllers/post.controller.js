const Post = require("../models/postModel");
const postController = {
  getAllPost: async (req, res, next) => {
    try {
      const allPost = await Post.find();
      if (!allPost) {
        const err = new Error("Can not find any post");
        err.statusCode = 404;
        throw err;
      }
      return res.status(201).json({
        message: "Find all post success.",
        success: true,
        data: {
          allPost,
        },
      });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  },
  getPost: async (req, res, next) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) {
        const err = new Error("Can not find post");
        err.statusCode = 404;
        throw err;
      }
      return res.status(201).json({
        message: "Find flashcard success.",
        success: true,
        data: {
          post,
        },
      });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  },
  createPost: async (req, res, next) => {
    try {
      const post = new Post();
      post.User = req.userId;
      post.title = req.body.title;
      post.content = req.body.content;
      await post.save();
      return res.status(201).json({
        message: "Create post success",
        success: true,
        data: {
          post,
        },
      });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  },
  deletePost: async (req, res, next) => {
    try {
      await Post.findByIdAndDelete(req.params.id);
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
  updatePost: async (req, res, next) => {
    try {
      await Post.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        content: req.body.content,
      });
      const newPost = await Post.findById(req.params.id);
      return res.status(201).json({
        message: "Update post success",
        success: true,
        data: {
          newPost
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

module.exports = postController;
