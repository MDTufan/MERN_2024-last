
const express = require ("express");
const { getuser } = require("../controller/userController");
const userRouter =express.Router();


userRouter.get("/",getuser);
   


   module.exports={userRouter}
   