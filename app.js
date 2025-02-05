require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

// Import Errors
const notFoundMidleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");
const port = process.env.PORT || 3000;

const authRouter = require("./routes/auth");
const jobsRouter = require("./routes/jobs");
const connectDB = require("./db/connect");
const authenticateUser = require("./middleware/authentication");
// Middle ware
app.use(express.json());

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateUser, jobsRouter);

// Errors
app.use(notFoundMidleware);
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
