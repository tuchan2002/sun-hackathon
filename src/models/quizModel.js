const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quizSchema = new Schema({
  User: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  Questions: [{
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Question'
  }]
});

module.exports = mongoose.model("Quiz", quizSchema);