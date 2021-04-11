const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AppError = require("../errors/appError");
const userService = require("./userService");
const config = require("../config");

const login = async (email, password) => {
  try {
    // Validacion de email
    const user = await userService.findByEmail(email);

    if (!user) {
      throw new AppError(
        "Authentication failed! Email / Password not found.",
        400
      );
    }

    // Validacion de usario habilitado

    if (!user.enable) {
      throw new AppError("Authentication failed! User disable!", 400);
    }

    // Validacion de password

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      throw new AppError(
        "Authentication failed! Email / Password not found.",
        400
      );
    }

    // Generar JWT

    const token = _encrypt(user._id);

    return {
      token,
      user: user.name,
      role: user.role,
    };
  } catch (error) {
    throw error;
  }
};

_encrypt = (id) => {
  return jwt.sign({ id }, config.auth.secret, { expiresIn: config.auth.ttl });
};

module.exports = {
  login,
};
