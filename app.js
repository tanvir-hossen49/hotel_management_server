const express = require("express");
require("dotenv").config();
const createError = require("http-errors");
const cors = require("cors");
const morgan = require("morgan");
const { errorResponse } = require("./controller/responseController");
const router = require("./routes");

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(morgan("combined"));
app.use(express.urlencoded({ extended: true }));

app.use(router);

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
