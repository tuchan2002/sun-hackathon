const Users = require("../models/userModel");
const Activity = require("../models/activityModel");

const getUserProfile = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const user = await Users.findById(userId);
    if (!user) {
      const err = new Error("Could not find user.");
      err.statusCode = 404;
      throw err;
    }

    res.status(200).json({
      message: "",
      success: true,
      data: {
        user,
      },
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const addUserProfile = async (req, res, next) => {
  const { university, graduationYear, avatar } = req.body;
  const userId = req.userId;
  try {
    const updateUser = await Users.updateOne(
      { _id: userId },
      {
        university,
        graduationYear,
        avatar,
      }
    );

    res.status(301).json({
      message: "",
      success: true,
      data: {
        updateUser,
      },
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const addUserActivity = async (req, res, next) => {
  const { quiz, result } = req.body;
  try {
    const newActivity = new Activity({
      quiz,
      result,
    });

    const savedActivity = await newActivity.save();

    const user = await Users.findById(req.userId);
    if (!user) {
      const err = new Error("Could not find user.");
      err.statusCode = 404;
      throw err;
    }

    user.history.push(savedActivity._id);
    const savedUser = await user.save();

    res.status(201).json({
      message: "",
      success: true,
      data: {
        savedUser,
      },
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const getUserHistory = async (req, res, next) => {
  try {
    const user = await Users.findById(req.userId).populate("history.Activity");
    if (!user) {
      const err = new Error("Could not find user.");
      err.statusCode = 404;
      throw err;
    }

    const awaitActivity = user.history.map((val) => {
      return Activity.findById(val.toString()).populate("quiz");
    });

    const activities = await Promise.all(awaitActivity);
    res.status(201).json({
      message: "",
      success: true,
      data: {
        activities,
      },
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const addUserBookmark = async (req, res, next) => {
  const userId = req.userId;
  const { flashcard, lastVisited } = req.body;
  try {
    const user = await Users.findById(userId);
    if (!user) {
      const err = new Error("Could not find user.");
      err.statusCode = 404;
      throw err;
    }

    user.flashcardBM.push({
      flashcard,
      lastVisited,
    });

    const savedUser = await user.save();

    res.status(200).json({
      message: "",
      success: true,
      data: {
        savedUser,
      },
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const userController = {
  getUserProfile,
  addUserProfile,
  addUserActivity,
  getUserHistory,
  addUserBookmark,
};

module.exports = userController;
