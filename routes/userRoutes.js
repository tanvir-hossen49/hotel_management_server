const { getAllUsers, deleteUserByID } = require("../controller/userController");
const userRouter = require("express").Router();

// getUser by id
userRouter.get("/:userId", () => {});
// update user by id
userRouter.put("/:userId", () => {});
// update user by id
userRouter.patch("/:userId", () => {});
// delete user by id
userRouter.delete("/", deleteUserByID);
// create user
userRouter.post("/", () => {});
// get all users
userRouter.get("/", getAllUsers);

module.exports = userRouter;
