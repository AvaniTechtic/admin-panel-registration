/**
 * Models/userModel.js
 *
 * Create mongoDB Schema for the Users.
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = new Schema({
  Username: {
    type: String,
    required: [true, "Username is required"],
  },
  userType: {
    type: String,
    enum: ["User", "Admin"],
    default: "User",
    required: [true, "userType is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  otp: {
    type: Number,
    default: null
  }
});

const UserModel = mongoose.model("User", user);

module.exports = UserModel;
