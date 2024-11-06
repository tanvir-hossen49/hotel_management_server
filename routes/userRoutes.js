const {
  createUser,
  getAllUsers,
  deleteUser,
} = require("../controller/userController");

const userRouter = require("express").Router();

userRouter.post("/", createUser);

// TODO: add middleware for get all users.
userRouter.get("/", getAllUsers);
userRouter.delete("/", deleteUser);

module.exports = userRouter;
