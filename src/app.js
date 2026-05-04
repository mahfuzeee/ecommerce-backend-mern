const exress = require("express");
const cors = require("cors");
const routes = require("./routes/index");
const pinoHttp = require("pino-http");
const errorHandler = require("./middlewares/errorHandler");
const notFound = require("./middlewares/notFound");
const logger = require("./utils/logger");
const cookieParser = require("cookie-parser");

const app = exress();

app.use(cors());
app.use(pinoHttp({ logger }));
app.use(exress.json());
app.use(exress.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy",
  });
});

app.use("/api/v1", routes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
