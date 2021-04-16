const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AppError = require("../errors/appError");
const userService = require("./userService");
const config = require("../config");
const logger = require("../loaders/logger");

const login = async (email, password) => {
  try {
    // Validacion de email
    const user = await userService.findByEmail(email);

    if (!user) {
      throw new AppError(
        "Authentication failed! Email / Password not found.",
        401
      );
    }

    // Validacion de usario habilitado

    if (!user.enable) {
      throw new AppError("Authentication failed! User disable!", 401);
    }

    // Validacion de password

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      throw new AppError(
        "Authentication failed! Email / Password not found.",
        401
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

const validToken = async (token) => {
  try {
    // Validar que se recibe un token como parametro
    if (!token) {
      throw new AppError("Authentication failed! Token required", 401);
    }

    // Validar que el token sean integro
    let id;
    try {
      const obj = jwt.verify(token, config.auth.secret);
      id = obj.id;
    } catch (verifyError) {
      throw new AppError("Authentication failed! Invalid Token", 401);
    }

    // Validar si hay usuario en bbdd
    const user = await userService.findById(id);

    if (!user) {
      throw new AppError("Authentication failed! Invalid Token", 401);
    }
    // validar si usurio esta habilitado

    if (!user.enable) {
      throw new AppError("Authentication failed! User Disable", 401);
    }
    // retornar el usuario
    return user;
  } catch (error) {
    throw error;
  }
};

const validRole = (user, ...roles) => {
  if (!roles.includes(user.role)) {
    throw new AppError("Autherization failed! User without privilages", 403);
  }

  return true;
};

_encrypt = (id) => {
  return jwt.sign({ id }, config.auth.secret, { expiresIn: config.auth.ttl });
};

module.exports = {
  login,
  validToken,
  validRole,
};
