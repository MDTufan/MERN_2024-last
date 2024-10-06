
const {body} = require('express-validator');
const { Error } = require('mongoose');


const validatorUserRegiater= [
    body('name')
    .trim()
    .notEmpty()
    .withMessage("User name is Required")
    .isLength({min:3,max:31})
    .withMessage("name shoud be at last 3-31 charaecter long"),
    body('email')
    .trim()
    .notEmpty()
    .withMessage("User Email is Required")
    .isEmail()
    .withMessage("invlied email"),
    body('password')
    .trim()
    .notEmpty()
    .withMessage("User password is Required")
    .isLength({min:6})
    .withMessage("password shoud be at last 6 charaecter long")
    .matches(/^(?:(?=.*\d)(?=.*[a-z])(?=.*[@$!%*?&])(?=.*[A-Z]).*)$/)
    .withMessage("password should be at last 1 uppercase letter,1 lowercase letter, 1 number and one special carecter."),
    body('address')
    .trim()
    .notEmpty()
    .withMessage("address is Required")
    .isLength({min:3})
    .withMessage("address shoud be at last 3 charaecter long"),
    body('phone')
    .trim()
    .notEmpty()
    .withMessage("phone is Required"),
    body('image')
    .custom((value,{req})=>{
        if(!req.file || !req.file.buffer){
            return new Error(" User image is Requried");

        }
        return true;
    })
    .withMessage("User image is Requried")
    
    
    
    
    
]

const validatorUserUpdate= [
 
   
    body('password')
    .trim()
    .notEmpty()
    .withMessage("User password is Required")
    .isLength({min:6})
    .withMessage("password shoud be at last 6 charaecter long")
    .matches(/^(?:(?=.*\d)(?=.*[a-z])(?=.*[@$!%*?&])(?=.*[A-Z]).*)$/)
    .withMessage("password should be at last 1 uppercase letter,1 lowercase letter, 1 number and one special carecter.")
   
    
]

const validatorUserLogin= [
 
    body('email')
    .trim()
    .notEmpty()
    .withMessage("User Email is Required")
    .isEmail()
    .withMessage("invlied email"),
    body('password')
    .trim()
    .notEmpty()
    .withMessage("User password is Required")
    .isLength({min:6})
    .withMessage("password shoud be at last 6 charaecter long")
    .matches(/^(?:(?=.*\d)(?=.*[a-z])(?=.*[@$!%*?&])(?=.*[A-Z]).*)$/)
    .withMessage("password should be at last 1 uppercase letter,1 lowercase letter, 1 number and one special carecter.")
   
    
]


const validatorupdatePassword= [
 
   
    body('oldPassword')
    .trim()
    .notEmpty()
    .withMessage("User old password is Required")
    .isLength({min:6})
    .withMessage("old password shoud be at last 6 charaecter long")
    .matches(/^(?:(?=.*\d)(?=.*[a-z])(?=.*[@$!%*?&])(?=.*[A-Z]).*)$/)
    .withMessage("old password should be at last 1 uppercase letter,1 lowercase letter, 1 number and one special carecter."),
    body('newPassword')
    .trim()
    .notEmpty()
    .withMessage("User new password is Required")
    .isLength({min:6})
    .withMessage("new password shoud be at last 6 charaecter long")
    .matches(/^(?:(?=.*\d)(?=.*[a-z])(?=.*[@$!%*?&])(?=.*[A-Z]).*)$/)
    .withMessage("new password should be at last 1 uppercase letter,1 lowercase letter, 1 number and one special carecter."),

    body('confirmedPassword').custom((value,{req})=>{
        if( value !== req.body.newPassword){
           throw new Error("confirmed password did not match.")
        }
        return true;
    })
   
   
    
]

const validatorForgetPassword= [
 
    body('email')
    .trim()
    .notEmpty()
    .withMessage("User Email is Required")
    .isEmail()
    .withMessage("invlied email"),
   
   
    
]
const validatorresetPassword= [
 
    body('token')
    .trim()
    .notEmpty()
    .withMessage("Token is Required"),
    body('password')
    .trim()
    .notEmpty()
    .withMessage("Reset password is Required")
    .isLength({min:6})
    .withMessage("Reset password shoud be at last 6 charaecter long")
    .matches(/^(?:(?=.*\d)(?=.*[a-z])(?=.*[@$!%*?&])(?=.*[A-Z]).*)$/)
    .withMessage("Reset password should be at last 1 uppercase letter,1 lowercase letter, 1 number and one special carecter.")
    
   
   
    
]
module.exports={validatorUserRegiater,validatorUserLogin,validatorUserUpdate,validatorupdatePassword,validatorForgetPassword,validatorresetPassword}