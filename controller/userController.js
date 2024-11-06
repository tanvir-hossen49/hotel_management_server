const createError = require("http-errors");
const Users = require("../model/userModel.js");
const { successResponse } = require("./responseController.js");

const createUser = async (req, res, next) => {
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

    //create user
    const result = await Users.create(users);
    return successResponse(res, {
      statusCode: 200,
      message: "user was created successful",
      payload: { result },
    });
  } catch (error) {
    return next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await Users.find();

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

module.exports = { createUser, getAllUsers, deleteUser };
