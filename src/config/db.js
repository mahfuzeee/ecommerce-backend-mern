require("dotenv").config();
const mongoose = require("mongoose");
const logger = require("../utils/logger");

const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI_LOCAL;
  try {
    await mongoose.connect(mongoURI);
    logger.info(`MongoDB Connected: ${mongoose.connection.host}`);
  } catch (error) {
    logger.error({ err: error }, "Failed to connect to MongoDB");
    process.exit(1);
  }
};

module.exports = connectDB;
