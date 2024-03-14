require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const secretKey = process.env.SECRET_KEY;
const User = require("../models/userModel");

///// GETPROFILE ////////// GETPROFILE ////////// GETPROFILE ////////// GETPROFILE ////////// GETPROFILE /////

const getProfile = async (req, res) => {
  try {
    const username = req.params.username;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const total = async (req, res) => {
  try {
    const username = req.params.username;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.log(req.params.username)
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
/////  DEPOSIT //////////  DEPOSIT //////////  DEPOSIT //////////  DEPOSIT //////////  DEPOSIT /////////  DEPOSIT /////

const deposit = async (req, res) => {
  const username = req.params.username;
  const { currentUser, depositAmount } = req.body;
  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    user.balance += parseInt(depositAmount);
    await user.save();
    return res.status(200).json(user);
  } catch (error) {
    console.log(depositAmount)
    console.error('Error making deposit at controller:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const withdraw = async (req, res) => {
  const username = req.params.username;
  const { currentUser, withdrawAmount } = req.body;
  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    user.balance -= parseInt(withdrawAmount);
    await user.save();

    return res.status(200).json(user);
  } catch (error) {
    console.log(withdrawAmount)
    console.error('Error making withdraw at controller:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

///// LOGOUT ////////// LOGOUT ////////// LOGOUT ////////// LOGOUT ////////// LOGOUT ////////// LOGOUT //////////

const logout = async (req, res) => {
  try {
    res.status(201).json({ message: 'adios' });

  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { getProfile, deposit, withdraw, logout, total };


