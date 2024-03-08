const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  balance: { type: Number, default: 1000 },
});

const User = mongoose.model("User", userSchema, "users");

module.exports = User;
