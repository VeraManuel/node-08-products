const { check } = require("express-validator");
const { validationResult } = require("../commons");

const _emailRequired = check("email", "Email is required").not().isEmpty();
const _emailValid = check("email", "Email is invalid").isEmail();
const _passwordRequired = check("password", "Password is required")
  .not()
  .isEmpty();

const postLoginRequestValidation = [
  _emailRequired,
  _emailValid,
  _passwordRequired,
  validationResult,
];

module.exports = {
  postLoginRequestValidation,
};
