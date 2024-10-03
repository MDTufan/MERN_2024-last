
const express = require ("express");
const { handellogin, handellogout } = require("../controller/authcontroller");

const authRouter=express.Router();

authRouter.post("/login",handellogin)
authRouter.post("/logout",handellogout)




module.exports={authRouter};