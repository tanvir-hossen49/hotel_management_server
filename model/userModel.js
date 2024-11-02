const { Schema, model } = require("mongoose");
const bcryptjs = require("bcryptjs");

const userModel = new Schema(
  {
    name: {
      type: String,
      trim: true,
      minlength: [3, "The length of user name must be at least 3 characters"],
      maxlength: [31, "The length of user name can be maximum 31 characters"],
      required: [true, "User name is required"],
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "User email is required"],
      lowercase: true,
      validate: {
        validator: function (value) {
          return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
            value
          );
        },
        message: "Please enter a valid email",
      },
    },
    password: {
      type: String,
      minlength: [6, "The length of password can be minimum 6 characters"],
      set: value => bcryptjs.hashSync(value, bcryptjs.genSaltSync(10)),
    },
    image: {
      type: String,
    },
    role: {
      type: String,
    },
  },
  { timestamps: true }
);

const users = model("users", userModel);

module.exports = users;
