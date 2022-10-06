const { body } = require("express-validator");

const authValidation = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Please enter a valid email.")
    .normalizeEmail(),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password is at least 6 characters long."),
];

module.exports = authValidation;
