const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const questionSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  answers: [
    {
      type: String,
      required: true,
    },
  ],
  result: {
    type: Number,
  },
});

module.exports = mongoose.model("Question", questionSchema);