
const express = require ("express");
const { handellogin, handellogout, handelrefreshtoken, handelprotectedRoute } = require("../controller/authcontroller");
const { isLogedOut, isLogedIn } = require("../middleware/auth");
const { validatorUserLogin } = require("../validators/auth");
const { runValidator } = require("../validators");

const authRouter=express.Router();

authRouter.post("/login",validatorUserLogin,runValidator,isLogedOut ,handellogin)
authRouter.post("/logout",isLogedIn, handellogout)
authRouter.get("/refreshtoken",  handelrefreshtoken)
authRouter.get("/protected",  handelprotectedRoute)





module.exports={authRouter};