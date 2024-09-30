
const express = require ("express");
const { getuser, getuserId, deletuser, getRegister, verifyRegister } = require("../controller/userController");
const upload = require("../middleware/uploadFile");
const userRouter =express.Router();


userRouter.post("/register",upload.single('image'),getRegister);
userRouter.post("/verify",verifyRegister);
userRouter.get("/",getuser);
userRouter.get("/:id",getuserId);
userRouter.delete("/:id",deletuser);
   


   module.exports={userRouter}
   