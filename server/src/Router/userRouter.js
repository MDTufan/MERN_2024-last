
const express = require ("express");
const { getuser, getuserId, deletuser, getRegister, verifyRegister, updateUserId } = require("../controller/userController");
const upload = require("../middleware/uploadFile");
const { validatorUserRegiater, validatorUserUpdate } = require("../validators/auth");
const { runValidator } = require("../validators");
const { isLogedIn, isLogedOut, isAdmin } = require("../middleware/auth");
const userRouter =express.Router();


userRouter.post("/register",
   upload.single('image'),
   isLogedOut,
   validatorUserRegiater,
   runValidator,
  getRegister);
userRouter.post("/verify",isLogedOut,verifyRegister);
userRouter.get("/", isLogedIn,isAdmin,getuser);
userRouter.get("/:id",isLogedIn, getuserId);
userRouter.delete("/:id",isLogedIn,deletuser);
userRouter.put("/:id", upload.single('image'),isLogedIn,validatorUserUpdate,runValidator, updateUserId);
   


   module.exports={userRouter}
   