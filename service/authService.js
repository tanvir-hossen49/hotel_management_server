const createError = require("http-errors");
const { createNewUser, findUserByProperty } = require("./userService");

const registerService = async ({ name, email, password, phone }) => {
  const existingUser = await findUserByProperty("email", email);

  if (existingUser) {
    throw createError(409, "User already exists");
  }

  const user = await createNewUser(name, email, password, phone);

  return user;
};

const loginService = async userId => {
  const user = await findUserByProperty({ _id: userId });

  if (!user) {
    throw createError(404, "User not found");
  }

  const { name, email, phone, _id, role } = user;
  return { name, email, phone, _id, role };
};

module.exports = {
  registerService,
  loginService,
};
