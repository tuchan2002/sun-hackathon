const Comments = require("../models/commentModel");
const commentController = {
  getCommentsByPostId: async (req, res) => {
    try {
      const comments = await Comments.find({ postId: req.params.postId }).sort({
        createdAt: -1,
      });
      return res.json({ success: true, comments });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = commentController;
