
const express = require ("express");
const { handellogin, handellogout } = require("../controller/authcontroller");
const { isLogedOut, isLogedIn } = require("../middleware/auth");

const authRouter=express.Router();

authRouter.post("/login",isLogedOut ,handellogin)
authRouter.post("/logout",isLogedIn, handellogout)




module.exports={authRouter};