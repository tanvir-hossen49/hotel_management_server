const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const { successResponse } = require("./responseController.js");
const { registerService, loginService } = require("../service/authService.js");

const registerController = async (req, res, next) => {
  try {
    const { name, password, email, phone } = req.body;

    if (!name || !password || !email || !phone) {
      throw createError(
        400,
        "Missing required fields: name, password, email, and phone are all necessary."
      );
    }

    const user = await registerService({
      name,
      password,
      email,
      phone,
    });
    const token = jwt.sign({ user }, "golam-tanvir");

    return successResponse(res, {
      statusCode: 200,
      message: "user was created successful",
      payload: { token },
    });
  } catch (error) {
    return next(error);
  }
};

const loginController = async (req, res, next) => {
  try {
    // Extract token from headers
    const token = req.headers.authorization?.split(" ")[1];

    // Check if the token is provided
    if (!token) {
      throw createError(401, "Access denied. No token provided.");
    }

    // Verify the token
    const decoded = jwt.verify(token, "golam-tanvir");
    const userId = decoded.user._id;
    const user = await loginService(userId);

    return successResponse(res, {
      statusCode: 200,
      message: "User retrieved successfully",
      payload: { user },
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = { registerController, loginController };
