const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const flashcardSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  Cards: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Card",
    },
  ],
  User: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

module.exports = mongoose.model("Flashcard", flashcardSchema);
