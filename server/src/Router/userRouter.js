
const express = require ("express");
const { getuser, getuserId, deletuser, getRegister } = require("../controller/userController");
const userRouter =express.Router();


userRouter.post("/register",getRegister);
userRouter.get("/",getuser);
userRouter.get("/:id",getuserId);
userRouter.delete("/:id",deletuser);
   


   module.exports={userRouter}
   