const createError = require("http-errors");
const { successResponse } = require("./responseController.js");
const {
  deleteUserByProperty,
  findAllUsers,
} = require("../service/userService.js");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await findAllUsers();

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

    const result = await deleteUserByProperty("email", email);

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

module.exports = { getAllUsers, deleteUser };
