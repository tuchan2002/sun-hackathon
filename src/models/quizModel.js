const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quizSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  questions: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Question",
    },
  ],
});

module.exports = mongoose.model("Quiz", quizSchema);
