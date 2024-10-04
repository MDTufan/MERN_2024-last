
const express = require ("express");
const { handellogin, handellogout } = require("../controller/authcontroller");
const { isLogedOut, isLogedIn } = require("../middleware/auth");
const { validatorUserLogin } = require("../validators/auth");
const { runValidator } = require("../validators");

const authRouter=express.Router();

authRouter.post("/login",validatorUserLogin,runValidator,isLogedOut ,handellogin)
authRouter.post("/logout",isLogedIn, handellogout)




module.exports={authRouter};