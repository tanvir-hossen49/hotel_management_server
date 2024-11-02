const { createUser } = require("../controller/userController");

const userRouter = require("express").Router();

userRouter.post("/", createUser);

module.exports = userRouter;
