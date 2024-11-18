const User = require("../model/userModel");

const findUserByProperty = (key, value) => {
  if (key === "_id") {
    return User.findById(value);
  } else {
    return User.findOne({
      [key]: value,
    });
  }
};

const createNewUser = (name, email, password, phone) => {
  return User.create({ name, email, password, phone });
};

const deleteUserByProperty = (key, value) => {
  return User.deleteOne({ [key]: value });
};
const findAllUsers = () => {
  return User.find();
};

module.exports = {
  findUserByProperty,
  createNewUser,
  deleteUserByProperty,
  findAllUsers,
};
