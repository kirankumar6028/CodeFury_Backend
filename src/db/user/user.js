const mongoose = require("mongoose");
const validator = require("validator");

const validateUser = require("./user.validation");

const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    index: { unique: true }, // checks if unique
    validate(value) {
      return (
        validateUser.isAlphaNumericOnly(value) &&
        validateUser.isLongEnough(value)
      );
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate(value) {
      if (!validator.default.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (!validateUser.isLongEnough(value)) {
        throw new Error("Too short password");
      }
    },
  },
});

const User = mongoose.model("users", userSchema);

module.exports = User;
