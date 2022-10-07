const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cardSchema = new Schema({
  japaneseWord: {
    type: String,
    required: true
  },
  vietnameseWord: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Card", cardSchema);
