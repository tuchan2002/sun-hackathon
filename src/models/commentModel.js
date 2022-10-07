const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const commentSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  User: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
});

module.exports = mongoose.model("Comment", commentSchema);