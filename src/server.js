require("dotenv").config();
const app = require("./app");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const logger = require("./utils/logger");

const PORT = Number(process.env.PORT) || 3000;
let server;

const startServer = async () => {
  try {
    await connectDB();
    server = app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  } catch (error) {
    logger.error({ err: error }, "Failed to start server");
    process.exit(1);
  }
};

const closeServer = async (signal) => {
  logger.info(`${signal} received. Shutting down gracefully.`);
  try {
    await mongoose.connection.close();

    if (server) {
      server.close(() => {
        logger.info("HTTP server closed.");
        process.exit(0);
      });
    } else {
      process.exit(0);
    }
  } catch (error) {
    logger.error({ err: error }, "Failed to shutdown the server");
    process.exit(1);
  }
};

process.on("SIGINT", () => closeServer("SIGINT"));
process.on("SIGTERM", () => closeServer("SIGTERM"));

startServer();
