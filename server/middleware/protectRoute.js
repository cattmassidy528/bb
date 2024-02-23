
require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const secretKey = process.env.SECRET_KEY;


const protectRoute = (req, res, next) => {
  // Extract token from request header
  const token = req.headers.authorization;

  // Verify token
  jwt.verify(token, secretKey, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    } else {
      // Token is valid, proceed to the next middleware or route handler
      req.user = decodedToken;
      next();
    }
  });
};

module.exports = { protectRoute };
