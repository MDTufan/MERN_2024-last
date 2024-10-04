
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


module.exports={validatorUserRegiater,validatorUserLogin,validatorUserUpdate}