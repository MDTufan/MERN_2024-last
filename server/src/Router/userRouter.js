
const express = require ("express");
const { getuser, getuserId, deletuser, getRegister, verifyRegister, updateUserId, banUserId, unbanUserId, updatePassword, forgetPassword } = require("../controller/userController");
const upload = require("../middleware/uploadFile");
const { validatorUserRegiater, validatorUserUpdate, validatorupdatePassword, validatorForgetPassword } = require("../validators/auth");
const { runValidator } = require("../validators");
const { isLogedIn, isLogedOut, isAdmin } = require("../middleware/auth");
const userRouter =express.Router();

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
userRouter.get("/:id",isLogedIn, getuserId);
// delet user
userRouter.delete("/:id",isLogedIn,deletuser);
// update user
userRouter.put("/:id", upload.single('image'),isLogedIn,validatorUserUpdate,runValidator, updateUserId);

// password Update
userRouter.put("/updatePassword/:id", validatorupdatePassword,runValidator, isLogedIn, updatePassword);
// Forget Update
userRouter.post("/forgetPassword", validatorForgetPassword,runValidator,  forgetPassword);


// ban&unban User
userRouter.put("/ban/:id", isLogedIn, isAdmin, banUserId);
userRouter.put("/unban/:id", isLogedIn, isAdmin, unbanUserId);
   


   module.exports={userRouter}
   