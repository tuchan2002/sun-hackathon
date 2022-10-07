const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");

const Users = require("../models/userModel");
const sendMail = require("../helpers/sendMail");

const authController = {
  register: async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const err = new Error("Validation failed, entered data is incorrect.");
      err.statusCode = 422;
      err.data = errors.array();
      return next(err);
    }

    const { displayName, email, password } = req.body;

    try {
      const user = await Users.findOne({ email });
      if (user) {
        const err = new Error("Email address already exists.");
        err.statusCode = 401;
        throw err;
      }

      const hashedPw = await bcrypt.hash(password, 12);
      const newUser = new Users({
        displayName,
        email,
        password: hashedPw,
      });

      await newUser.save();

      const access_token = createAccessToken({ id: newUser.id });
      const refresh_token = createRefreshToken({ id: newUser.id });

      res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        path: "/api/v1/auth/refresh_token",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      return res.status(201).json({
        message: "Register success.",
        success: true,
        data: {
          access_token,
          user: newUser,
        },
      });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  },
  login: async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const err = new Error("Validation failed, entered data is incorrect.");
      err.statusCode = 422;
      err.data = errors.array();
      return next(err);
    }

    const { email, password } = req.body;

    try {
      const user = await Users.findOne({ email });
      if (!user) {
        const err = new Error("A user with email could not be found!");
        err.statusCode = 401;
        throw err;
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        const err = new Error("Incorrect email or password.");
        err.statusCode = 401;
        throw err;
      }

      const access_token = createAccessToken({ id: user.id });
      const refresh_token = createRefreshToken({ id: user.id });

      res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        path: "/api/v1/auth/refresh_token",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      return res.json({
        message: "Login success.",
        success: true,
        data: {
          access_token,
          user: {
            ...user._doc,
            password: "",
          },
        },
      });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  },
  logout: async (req, res, next) => {
    try {
      res.clearCookie("refreshtoken", { path: "/api/v1/auth/refresh_token" });
      return res.json({ message: "Logged out." });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  },
  generateAccessToken: async (req, res, next) => {
    try {
      const refresh_token = req.cookies.refreshtoken;
      if (!refresh_token) {
        const err = new Error("Please Login or Register.");
        err.statusCode = 400;
        throw err;
      }

      jwt.verify(
        refresh_token,
        process.env.REFRESH_TOKEN_SECRET,
        async (error, result) => {
          if (error) {
            const err = new Error("Please Login or Register");
            err.statusCode = 400;
            throw err;
          }

          const user = await Users.findById(result.id);
          if (!user) {
            return res.status(400).json({ msg: "This does not exist." });
          }

          const access_token = createAccessToken({ id: result.id });
          return res.json({
            message: "Generate access token success",
            success: true,
            data: { access_token, user },
          });
        }
      );
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  },
  resetPassword: async (req, res, next) => {
    const { email, urlNewPW } = req.body;
    const resetToken = uuidv4();

    try {
      const user = await Users.findOne({ email });
      if (!user) {
        const err = new Error("Email address already exists.");
        err.statusCode = 401;
        throw err;
      }

      user.resetToken = resetToken;
      user.resetTokenExpiration = Date.now() + 3600000;

      const updateUser = await user.save();
      const sendedData = await sendMail({
        to: email,
        from: "thinhtheblues1102@gmail.com",
        subject: "Password reset",
        // use urlNewPW
        html: `
            <p>You requested a password reset</p>
            <p>Click this <a href="${urlNewPW}/${updateUser.resetToken}">link</a> to set a new password.</p>
          `,
      });

      res.status(200).json({
        message: "Please check your email.",
        success: true,
        sendedData,
      });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  },
  newPassword: async (req, res, next) => {
    const { newPassword, resetToken } = req.body;

    try {
      const user = await Users.findOne({
        resetToken: resetToken,
        resetTokenExpiration: { $gt: Date.now() },
      });

      if (!user) {
        const err = new Error("Reset password false. Reset token expriration");
        err.statusCode = 400;
        throw err;
      }

      const hashedPw = await bcrypt.hash(newPassword, 12);
      user.password = hashedPw;
      user.resetToken = null;
      user.resetTokenExpiration = null;

      const newUser = await user.save();

      res.status(200).json({
        message: "Reset password success.",
        success: true,
        data: {
          user: newUser,
          password: "",
        },
      });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  },
  changePassword: async (req, res, next) => {
    const { newPassword, oldPassword } = req.body;

    try {
      const user = await Users.findById(req.userId);
      if (!user) {
      }

      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        const err = new Error("Incorrect old password.");
        err.statusCode = 401;
        throw err;
      }

      const hashedPw = await bcrypt.hash(newPassword, 12);
      user.password = hashedPw;

      await user.save();
      res.status(200).json({
        message: "Change password success.",
        success: true,
      });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  },
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

module.exports = authController;
