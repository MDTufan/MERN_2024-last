
const express = require ("express");
const userRouter =express.Router();
const { getuser, getuserId, deletuser, getRegister, verifyRegister, updateUserId, banUserId, unbanUserId, updatePassword, forgetPassword, resetPassword } = require("../controller/userController");
const upload = require("../middleware/uploadFile");
const { validatorUserRegiater, validatorUserUpdate, validatorupdatePassword, validatorForgetPassword, validatorresetPassword } = require("../validators/auth");
const { runValidator } = require("../validators");
const { isLogedIn, isLogedOut, isAdmin } = require("../middleware/auth");


// postuser
userRouter.post("/register",
   upload.single('image'),
   isLogedOut,
   validatorUserRegiater,
   runValidator,
  getRegister);
userRouter.post("/verify",isLogedOut,verifyRegister);
// getuser
userRouter.get("/", isLogedIn,isAdmin,getuser);
userRouter.get("/:id([0-9a-fA-F]{24})",isLogedIn, getuserId);
// delet user
userRouter.delete("/:id([0-9a-fA-F]{24})",isLogedIn,deletuser);

userRouter.put("/resetPassword", validatorresetPassword,runValidator,  resetPassword);
// update user
userRouter.put("/:id([0-9a-fA-F]{24})", upload.single('image'),isLogedIn,validatorUserUpdate,runValidator, updateUserId);

// password Update
userRouter.put("/updatePassword/:id([0-9a-fA-F]{24})", validatorupdatePassword,runValidator, isLogedIn, updatePassword);
// Forget Update

userRouter.post("/forgetPassword", validatorForgetPassword,runValidator,  forgetPassword);



// ban&unban User
userRouter.put("/ban/:id([0-9a-fA-F]{24})", isLogedIn, isAdmin, banUserId);
userRouter.put("/unban/:id([0-9a-fA-F]{24})", isLogedIn, isAdmin, unbanUserId);
   


   module.exports={userRouter}
   