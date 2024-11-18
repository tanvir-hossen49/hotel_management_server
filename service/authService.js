const createError = require("http-errors");
const { createNewUser, findUserByProperty } = require("./userService");

const registerService = async ({ name, email, password, phone }) => {
  try {
    const existingUser = await findUserByProperty("email", email);

    if (existingUser) {
      throw createError(409, "User already exists");
    }

    const user = await createNewUser(name, email, password, phone);

    return user;
  } catch (error) {
    throw createError(500, "Something went wrong");
  }
};

const loginService = async ({ userId }) => {
  try {
    const user = await findUserByProperty({ _id: userId });

    if (!user) {
      throw createError(404, "User not found");
    }

    return user;
  } catch (error) {
    throw createError(500, "Something went wrong");
  }
};

module.exports = {
  registerService,
  loginService,
};
