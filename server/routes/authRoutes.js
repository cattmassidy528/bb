const express = require("express");
const router = express.Router();
const { register, authenticateUser } = require("../controllers/authController");
const { getProfile, logout, deposit } = require("../controllers/mainController")
const { protectRoute } = require('../middleware/protectRoute');


///// REGISTER ////////// REGISTER ////////// REGISTER /////

router.post("/register", register);

///// LOGIN ////////// LOGIN ////////// LOGIN ////////// LOGIN /////

router.post("/login", authenticateUser);

///// LOGOUT ////////// LOGOUT ////////// LOGOUT ////////// LOGOUT /////

router.post("/logout", logout);

///// GETPROFILE ////////// GETPROFILE ////////// GETPROFILE /////
///// PROFILEDATA.BALANCE??? ////////// PROFILEDATA.BALANCE??? /////

router.get("/:username", getProfile);

///// GETBALANCE ////////// GETBALANCE ////////// GETBALANCE /////

// router.get("/:username/getBalance", getBalance);

///// DEPOSIT ////////// DEPOSIT ////////// DEPOSIT /////

router.post("/:username/deposit", deposit);

module.exports = router; 
