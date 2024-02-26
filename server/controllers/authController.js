require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const secretKey = process.env.SECRET_KEY;
const User = require("../models/userModel");
const { generateToken } = require('../config/jwtUtils'); // Import your custom token generation function

/////     /////     /////     /////     /////     /////     /////     /////     /////     /////     /////
///// REGISTER ////////// REGISTER ////////// REGISTER ////////// REGISTER ////////// REGISTER ////////// REGISTER /////
/////     /////     /////     /////     /////     /////     /////     /////     /////     /////     /////

const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }
    const hashedPassword = await bcryptjs.hash(password, 10);

    user = new User({
      username,
      email,
      password: hashedPassword,
    });
    await user.save();
    res.json({ msg: "User registered successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

/////     /////     /////     /////     /////     /////     /////     /////     /////     /////
///// AUTHENTICATEUSER ////////// AUTHENTICATEUSER ////////// AUTHENTICATEUSER ////////// AUTHENTICATEUSER /////
/////     /////     /////     /////     /////     /////     /////     /////     /////     /////

const authenticateUser = async (req, res, next) => {
  const { username, password } = req.body;

  try {

    let user = await User.findOne({ username });      // Check if the user exists

    if (!user) {              // Return 401 Unauthorized if the user does not exist
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);      // Verify password

    if (isPasswordValid) {
      const token = generateToken({ userId: user._id }); // Generate JWT token using your custom function

      return res.status(200).json({ user, token });        // Send the JSON response with the token and user details
    } else {
      return res.status(401).json({ message: "Invalid username or password" });
      // Return 401 Unauthorized if the password is invalid
    }
  } catch (error) {

    console.error("Error during loginnn  :", error);      // Return 500 Internal Server Error for any server errors
    return res.status(500).json({ message: "Internal server error" });
  }

};



module.exports = { register, authenticateUser }
