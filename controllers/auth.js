require("dotenv").config();
const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    token,
  });
};
const login = async (req, res) => {
  res.send("Login User");
};

module.exports = { login, register };
