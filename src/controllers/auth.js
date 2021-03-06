const express = require("express");
const authService = require("../services/authService");
const Success = require("../handlers/successHandler");

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    res.json(new Success(await authService.login(email, password)));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
};
