require("dotenv").config();
const logger = require("../utils/logger");

const errorHandler = (err, req, res, _next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  if (err.name === "ValidationError") {
    statusCode = 400;
    message = err.message;
  }

  if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid resource id";
  }

  logger.error({ err, method: req.method, url: req.originalUrl }, message);

  const payload = {
    success: false,
    message,
  };

  if (err.details) {
    payload.errors = err.details;
  }

  if (process.env.NODE_ENV === "development" && err.stack) {
    payload.stack = err.stack;
  }

  return res.status(statusCode).json(payload);
};

module.exports = errorHandler;
