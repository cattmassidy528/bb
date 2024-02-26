
require("dotenv").config();
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY; // Use the secret key from environment variables

///// GENERATE TOKEN ////////// GENERATE TOKEN ////////// GENERATE TOKEN ////////// GENERATE TOKEN /////
const generateToken = (payload) => {
  return jwt.sign(payload, secretKey, { expiresIn: '1h' }); // Example expiration time of 1 hour
};

///// VERIFY TOKEN ////////// VERIFY TOKEN ////////// VERIFY TOKEN ////////// VERIFY TOKEN /////
const verifyToken = (token) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    throw new Error('Invalid token');
  }
};

///// DECODE TOKEN ////////// DECODE TOKEN ////////// DECODE TOKEN ////////// DECODE TOKEN /////
const decodeToken = (token) => {
  return jwt.decode(token, { complete: true });
};

module.exports = {
  generateToken,
  verifyToken,
  decodeToken,
};
