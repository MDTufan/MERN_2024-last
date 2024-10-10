const {body} = require('express-validator');

const validatorProduct= [
    body('name')
    .trim()
    .notEmpty()
    .withMessage("product name is Required")
   
    .isLength({min:3 })
    .withMessage(" product name shoud be at last 3 charaecter long"),
    body('description')
    .trim()
    .notEmpty()
    .withMessage("description is Required")
   
    .isLength({min:3 ,max:150})
    .withMessage(" description shoud be at last 3-150 charaecter long"),
    body('price')
    .trim()
    .notEmpty()
    .withMessage("price name is Required")
    .isFloat({min:0})
    .withMessage(" price must be positive number"),
    // body('sold')
    // .trim()
    // .notEmpty()
    // .withMessage("product name is Required")
   
    // .isLength({min:3 ,max:150})
    // .withMessage(" product name shoud be at last 3-150 charaecter long"),
    body('quantity')
    .trim()
    .notEmpty()
    .withMessage("quantity is Required")
    .isInt({min:1})
    .withMessage(" quantity must be positive number"),
    body('category')
    .trim()
    .notEmpty()
    .withMessage("category is Required")
   
    
]

module.exports={validatorProduct}