
const express = require ("express");
const { getuser, getuserId, deletuser } = require("../controller/userController");
const userRouter =express.Router();


userRouter.get("/",getuser);
userRouter.get("/:id",getuserId);
userRouter.delete("/:id",deletuser);
   


   module.exports={userRouter}
   