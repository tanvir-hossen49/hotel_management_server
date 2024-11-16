const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const Users = require("../model/userModel.js");
const { successResponse } = require("./responseController.js");

const signupController = async (req, res, next) => {
  try {
    const users = req.body;
    users.role = "customer";

    //check user exits or not
    const query = { email: users.email };
    const existingUser = await Users.findOne(query);

    if (existingUser) {
      console.log(existingUser);
      throw createError(409, "User already exists");
    }

    const result = await Users.create(users);
    const token = jwt.sign({ result }, "golam-tanvir");
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
    const userId = decoded.result._id;
    console.log(decoded);

    // Find user by ID in the database
    const user = await Users.findById(userId);

    // Check if user exists
    if (!user) {
      throw createError(404, "User not found");
    }

    // Respond with user details
    return successResponse(res, {
      statusCode: 200,
      message: "User retrieved successfully",
      payload: { user },
    });
  } catch (error) {
    return next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await Users.find();

    if (!users || users.length === 0) {
      throw createError(404, "No users found");
    }

    return successResponse(res, {
      statusCode: 200,
      message: "User were return successful",
      payload: { users },
    });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const email = req.query.email;

    if (!email) {
      throw createError(400, "Email is required");
    }

    const result = await Users.deleteOne({ email: email });

    if (result.deletedCount === 0) {
      throw createError(404, "User not found");
    }

    return successResponse(res, {
      statusCode: 200,
      message: "User deleted successful",
      payload: { result },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { signupController, getAllUsers, deleteUser, loginController };
