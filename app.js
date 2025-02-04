require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();
// Import Errors
const notFoundMidleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");
const port = process.env.PORT || 3000;

// Middle ware
app.use(express.json());

// Route
app.get("/", (req, res, next) => {
  res.send("Jobs API");
});

// Errors
app.use(notFoundMidleware);
app.use(errorMiddleware);

const start = async (req, res, next) => {
  // connect db

  try {
    app.listen(port);
    console.log(`Server Has started`);
  } catch (error) {
    console.log(`The Serevr could not start`);
  }
};

start();
