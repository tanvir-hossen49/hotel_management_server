const router = require("express").Router();
const userRouter = require("./userRoutes");

router.use("/api/users", userRouter);

module.exports = router;
