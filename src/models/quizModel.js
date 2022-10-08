const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quizSchema = new Schema({
  title: {
    type: String,
    require: true,
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
