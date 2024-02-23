// require("dotenv").config();
// const express = require("express");
// const jwt = require("jsonwebtoken");
// const bcryptjs = require("bcryptjs");
// const secretKey = process.env.SECRET_KEY;
// app.use(express.json());
// const User = require("../models/userModel");

// const getBalance = async (req, res) => {
//   const username = req.params.currentUser;

//   try {
//     const user = await User.findOne({ username });

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.status(200).json({ balance: user.balance });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// /////     /////     /////     /////     /////     /////     /////     /////     /////     /////     /////
// /////  DEPOSIT //////////  DEPOSIT //////////  DEPOSIT //////////  DEPOSIT //////////  DEPOSIT /////////  DEPOSIT /////
// /////     /////     /////     /////     /////     /////     /////     /////     /////     /////     /////

// const deposit = async (req, res) => {
//   const username = req.params.currentUser;
//   const { depositAmount } = req.body;

//   try {
//     // Find the user by username
//     const user = await User.findOne({ username });

//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     // Update the user's balance
//     user.balance += depositAmount; // Assuming deposit adds to the balance

//     // Save the updated user object
//     await user.save();

//     // Respond with the updated user object
//     return res.status(200).json(user);
//   } catch (error) {
//     console.error('Error making deposit:', error);
//     return res.status(500).json({ error: 'Internal server error' });
//   }
// };

// module.exports = { getBalance, deposit }
