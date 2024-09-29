
const express = require ("express");
const { getuser, getuserId, deletuser, getRegister, verifyRegister } = require("../controller/userController");
const userRouter =express.Router();


userRouter.post("/register",getRegister);
userRouter.post("/verify",verifyRegister);
userRouter.get("/",getuser);
userRouter.get("/:id",getuserId);
userRouter.delete("/:id",deletuser);
   


   module.exports={userRouter}
   