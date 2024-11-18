const authRouter = require("express").Router();
const {
  registerController,
  loginController,
} = require("../controller/authController");

authRouter.post("/register", registerController);
authRouter.get("/login", loginController);

module.exports = authRouter;
