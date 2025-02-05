const User = require("../models/user");
const jwt = require("jsonwebtoken");

const UnauthenticatedError = require("../errors/unauthenticated");

const auth = async (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Authentication Invalid Header");
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // Attached the user to the job
    req.user = { userId: payload.userId, name: payload.name };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication Invalid Token");
  }
};

module.exports = auth;
