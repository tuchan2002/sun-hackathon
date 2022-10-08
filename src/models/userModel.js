const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    displayName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 20,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 0,
    },
    resetToken: {
      type: String,
      default: null,
    },
    resetTokenExpiration: {
      type: Date,
      default: null,
    },
    university: {
      type: String,
    },
    graduationYear: {
      type: Number,
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/dxnfba463/image/upload/v1664374422/images_iepweu.png",
    },
    history: [
      {
        type: Schema.Types.ObjectId,
        ref: "Activity",
      },
    ],
    flashcardBM: [
      {
        flashcard: {
          type: Schema.Types.ObjectId,
          ref: "Flashcard",
        },
        lastVisited: {
          type: Date,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
