const config = require("config");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const validateUser = require("./user.validation");

const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 3,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
});

// User check with credentials
userSchema.statics.findUserByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User is not found");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new Error("Unable to authenticate");
  }

  return user;
};

//For hashing the password
userSchema.pre("save", async function (next) {
  const user = this;
  // if user.isModified is done in the tutorial...donno y, check authenticaton section at 3rd video, [12:30]
  user.password = await bcrypt.hash(user.password, 8);
  next();
});

//custom method to generate authToken
userSchema.methods.generateAuthToken = function () {
  console.log(process.env.JWT_SECRET_KEY);
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "150 d",
  });
  return token;
};

const User = mongoose.model("users", userSchema);

module.exports = User;