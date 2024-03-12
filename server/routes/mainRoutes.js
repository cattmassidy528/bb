const express = require("express");
const router = express.Router();
const { getProfile, logout, deposit, total, withdraw } = require("../controllers/mainController")
const authenticateMiddleware = require('../middleware/authenticateMiddleware');



///// LOGOUT ////////// LOGOUT ////////// LOGOUT ////////// LOGOUT /////

router.post("/logout", logout);

///// GETPROFILE ////////// GETPROFILE ////////// GETPROFILE /////

router.get("/:username", getProfile);

router.get("/:username/total", authenticateMiddleware, total);

///// DEPOSIT ////////// DEPOSIT ////////// DEPOSIT /////
router.post("/:username/deposit", authenticateMiddleware, deposit);
router.post("/:username/withdraw", authenticateMiddleware, withdraw);



module.exports = router; 
