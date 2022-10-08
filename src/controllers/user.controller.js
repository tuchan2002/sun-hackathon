const Users = require("../models/userModel");

const getUserProfile = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const user = await Users.findById(userId);
    if (!user) {
      const err = new Error("Could not find user.");
      err.statusCode = 404;
      throw err;
    }

    const userProfile = {
      displayName: user.displayName,
      ...user.profile,
    };

    res.status(200).json({
      message: "",
      success: true,
      data: {
        userProfile,
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
  const profileData = req.body;
  const userId = req.userId;
  try {
    const user = await Users.findById(userId);
    if (!user) {
      const err = new Error("Could not find user.");
      err.statusCode = 404;
      throw err;
    }

    user.profile = profileData;
    const savedUser = await user.save();

    res.status(301).json({
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
};

module.exports = userController;
