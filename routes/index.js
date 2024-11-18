const router = require("express").Router();
const authRouter = require("./authRoutes");
const userRouter = require("./userRoutes");

router.use("/api/users", userRouter);
router.use("/api/auth/", authRouter);

module.exports = router;
