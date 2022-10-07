const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const postSchema = new Schema({
  title: {
    type: String
  },
  content: {
    type: String
  },
  comments: [{
    type: String
  }],
  User: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
});

module.exports = mongoose.model("Post", postSchema);