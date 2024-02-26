require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const secretKey = process.env.SECRET_KEY;
const User = require("../models/userModel");

/////     /////     /////     /////     /////     /////     /////     /////     /////     /////     /////
///// GETPROFILE ////////// GETPROFILE ////////// GETPROFILE ////////// GETPROFILE ////////// GETPROFILE /////
/////     /////     /////     /////     /////     /////     /////     /////     /////     /////     /////

// Controller function to retrieve a user profile
const getProfile = async (req, res) => {
  try {
    // Retrieve the user ID from the request parameters
    const username = req.params.username;
    // Query the database to find the user by ID
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // If user found, return the user profile data
    res.status(200).json({ user });
  } catch (error) {
    console.log(req.params.username)

    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/////     /////     /////     /////     /////     /////     /////     /////     /////     /////     /////
/////  DEPOSIT //////////  DEPOSIT //////////  DEPOSIT //////////  DEPOSIT //////////  DEPOSIT /////////  DEPOSIT /////
/////     /////     /////     /////     /////     /////     /////     /////     /////     /////     /////

const deposit = async (req, res) => {
  const username = req.params.username;
  const { currentUser, depositAmount } = req.body;
  // console.log(req)
  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    // old balance + new deposit PARSEINT IS CRUCIAL
    user.balance += parseInt(depositAmount);
    await user.save();

    return res.status(200).json(user);
  } catch (error) {
    console.log(depositAmount)
    console.error('Error making deposit at controller:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

/////     /////     /////     /////     /////     /////     /////     /////     /////     /////     /////
///// LOGOUT ////////// LOGOUT ////////// LOGOUT ////////// LOGOUT ////////// LOGOUT ////////// LOGOUT //////////
/////     /////     /////     /////     /////     /////     /////     /////     /////     /////     /////

const logout = async (req, res) => {
  try {
    res.status(201).json({ message: 'adios' });

  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { getProfile, deposit, logout };


