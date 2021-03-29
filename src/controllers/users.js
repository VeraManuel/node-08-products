const express = require("express");

/*
 *
 * @param {express.Request} req
 * @param {express.Response} res
 *
 */

const getAllUsers = (req, res) => {
  const user = [
    {
      id: 1,
      name: "manuel",
    },
    {
      id: 2,
      name: "Fernando",
    },
  ];

  res.status(200).json(user);
};

/*
 *
 * @param {express.Request} req
 * @param {express.Response} res
 *
 */

const createUser = (req, res) => {
  const user = req.body;
  user.id = 15;
  const result = {
    message: "User create",
    user,
  };

  res.status(201).json(result);
};

/*
 *
 * @param {express.Request} req
 * @param {express.Response} res
 *
 */

const updateUser = (req, res) => {
  const { id } = req.params;
  const user = req.body;
  user.id = id;

  const result = {
    message: "User updated",
    user,
  };
  res.status(200).json(result);
};

/*
 *
 * @param {express.Request} req
 * @param {express.Response} res
 *
 */

const updatePartialUser = (req, res) => {
  const { id } = req.params;
  const user = req.body;
  user.id = id;

  const result = {
    message: "User updated",
    user,
  };
  res.status(200).json(result);
};

/*
 *
 * @param {express.Request} req
 * @param {express.Response} res
 *
 */
const deleteUser = (req, res) => {
  const { id } = req.params;
  const result = {
    message: `User with id ${id} deleted`,
  };
  res.status(200).json(result);
};

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  updatePartialUser,
  deleteUser,
};
