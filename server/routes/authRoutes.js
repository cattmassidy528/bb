const express = require("express");
const router = express.Router();
const { register, authenticateUser } = require("../controllers/authController");
const authenticateMiddleware = require('../middleware/authenticateMiddleware');


///// REGISTER ////////// REGISTER ////////// REGISTER /////

router.post("/register", register);

///// LOGIN ////////// LOGIN ////////// LOGIN ////////// LOGIN /////

router.post("/login", authenticateUser);

///// LOGOUT ////////// LOGOUT ////////// LOGOUT ////////// LOGOUT /////


module.exports = router; 
