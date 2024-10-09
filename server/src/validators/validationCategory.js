const {body} = require('express-validator');

const validatorCategory= [
    body('name')
    .trim()
    .notEmpty()
    .withMessage("category name is Required")
   
    .isLength({min:3})
    .withMessage(" category name shoud be at last 3 charaecter long"),
    
]

module.exports={validatorCategory}