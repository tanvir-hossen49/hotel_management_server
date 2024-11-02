const express = require("express");
require("dotenv").config();
const createError = require("http-errors");
const cors = require("cors");
const morgan = require("morgan");
const userRouter = require("./routes/userRoutes");
const { errorResponse } = require("./controller/responseController");

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(morgan());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRouter);

app.get("/", (req, res) => {
  res.send("server is running !");
});

app.use((_req, _res, next) => {
  next(createError(404, "route not found"));
});

//server error handle
app.use((error, _req, res, _next) => {
  return errorResponse(res, {
    statusCode: error.status,
    message: error.message,
  });
});

module.exports = app;
