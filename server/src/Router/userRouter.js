
const express = require ("express");
const { getuser, getuserId, deletuser, getRegister, verifyRegister, updateUserId, banUserId, unbanUserId } = require("../controller/userController");
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

userRouter.put("/ban/:id", isLogedIn, isAdmin, banUserId);
userRouter.put("/unban/:id", isLogedIn, isAdmin, unbanUserId);
   


   module.exports={userRouter}
   