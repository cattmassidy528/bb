const express = require("express");
const router = express.Router();
const { getProfile, logout, deposit } = require("../controllers/mainController")
const authenticateMiddleware = require('../middleware/authenticateMiddleware');



///// LOGOUT ////////// LOGOUT ////////// LOGOUT ////////// LOGOUT /////

router.post("/logout", logout);

///// GETPROFILE ////////// GETPROFILE ////////// GETPROFILE /////
///// PROFILEDATA.BALANCE??? ////////// PROFILEDATA.BALANCE??? /////

router.get("/:username", getProfile);

///// DEPOSIT ////////// DEPOSIT ////////// DEPOSIT /////
router.post("/:username/deposit", authenticateMiddleware, deposit);



module.exports = router; 
