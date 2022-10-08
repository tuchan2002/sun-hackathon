const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const postSchema = new Schema({
  title: {
    type: String,
    require: true
  },
  content: {
    type: String,
    require: true
  },
  comments: [{
    type: String
  }],
  User: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  usersLiked: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    
  ]
});

module.exports = mongoose.model("Post", postSchema);