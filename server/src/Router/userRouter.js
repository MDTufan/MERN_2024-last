
const express = require ("express");
const { getuser, getuserId } = require("../controller/userController");
const userRouter =express.Router();


userRouter.get("/",getuser);
userRouter.get("/:id",getuserId);
   


   module.exports={userRouter}
   