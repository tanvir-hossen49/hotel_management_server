const {
  signupController,
  loginController,
  getAllUsers,
  deleteUser,
} = require("../controller/userController");

const userRouter = require("express").Router();

// TODO: add middleware for get all users.

userRouter.get("/", getAllUsers);
userRouter.delete("/", deleteUser);

module.exports = userRouter;
