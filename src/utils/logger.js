require("dotenv").config();
const pino = require("pino");

const options = {
  level: process.env.LOG_LEVEL || "info",
};

if (process.env.NODE_ENV !== "production") {
  options.transport = {
    target: "pino-pretty",
    options: { colorize: true },
  };
}

const logger = pino(options);

module.exports = logger;
