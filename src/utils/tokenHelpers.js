require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.generateToken = (email, _id) => {
  const key = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRES_IN || "7d";

  const payload = { email, _id };

  return jwt.sign(payload, key, { expiresIn: expiresIn });
};

exports.verifyToken = (token) => {
  try {
    const key = process.env.JWT_SECRET;
    return jwt.verify(token, key);
  } catch (error) {
    return null;
  }
};
