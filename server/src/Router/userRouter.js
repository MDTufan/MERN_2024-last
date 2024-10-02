
const express = require ("express");
const { getuser, getuserId, deletuser, getRegister, verifyRegister, updateUserId } = require("../controller/userController");
const upload = require("../middleware/uploadFile");
const { validatorUserRegiater } = require("../validators/auth");
const { runValidator } = require("../validators");
const userRouter =express.Router();


userRouter.post("/register",
   upload.single('image'),
   validatorUserRegiater,
   runValidator,
  getRegister);
userRouter.post("/verify",verifyRegister);
userRouter.get("/",getuser);
userRouter.get("/:id",getuserId);
userRouter.delete("/:id",deletuser);
userRouter.put("/:id", upload.single('image'),updateUserId);
   


   module.exports={userRouter}
   