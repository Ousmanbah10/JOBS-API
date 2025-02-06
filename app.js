require("dotenv").config();
require("express-async-errors");

// EXTRA SECURITY PACKAGES

const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

const express = require("express");
const app = express();

// Import Errors
const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");
const port = process.env.PORT || 3000;

const authRouter = require("./routes/auth");
const jobsRouter = require("./routes/jobs");
const connectDB = require("./db/connect");
const authenticateUser = require("./middleware/authentication");
// Middle ware
app.use(express.json());

// security
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 1000,
  })
);
// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateUser, jobsRouter);

// Errors
app.use(notFoundMiddleware);
app.use(errorMiddleware);

const start = async (req, res, next) => {
  try {
    await connectDB(process.env.MONGO_URI, port);
    app.listen(port);
    console.log(`Server Has started`);
  } catch (error) {
    console.log(`The Serevr could not start`);
  }
};

start();
