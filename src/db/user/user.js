const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require("mongoose");
const validator = require("validator");

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



//custom method to generate authToken 
userSchema.methods.generateAuthToken = function() { 
  const token = jwt.sign({ _id: this._id}, config.get('myprivatekey')); //get the private key from the config file -> environment variable
  return token;
}

const User = mongoose.model("users", userSchema);

module.exports = User;
