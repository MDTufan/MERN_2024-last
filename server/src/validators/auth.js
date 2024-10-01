
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
    .isLength({min:4})
    .withMessage("password shoud be at last 4 charaecter long"),
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


module.exports={validatorUserRegiater}