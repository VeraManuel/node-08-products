const { check } = require("express-validator");
const { validationResult } = require("../commons");
const { validToken, validRole } = require("../../services/authService");

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

const validJWT = async (req, res, next) => {
  try {
    const token = req.header("Authorization");

    const user = await validToken(token);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

const hasRole = (...roles) => {
  return (req, res, next) => {
    try {
      validRole(req.user, ...roles);
      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = {
  postLoginRequestValidation,
  validJWT,
  hasRole,
};
