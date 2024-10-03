
const express = require ("express");
const { handellogin } = require("../controller/authcontroller");

const authRouter=express.Router();

authRouter.post("/login",handellogin)




module.exports={authRouter};