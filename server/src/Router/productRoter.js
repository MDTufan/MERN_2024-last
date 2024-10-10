
const express = require ("express");
const { createProduct } = require("../controller/productController");
const productRouter =express.Router();
const upload = require("../middleware/uploadFile");
const { validatorProduct } = require("../validators/validationProduct");
const { runValidator } = require("../validators");
const { isLogedIn, isAdmin } = require("../middleware/auth");




productRouter.post("/", upload.single('image'),validatorProduct, runValidator,isLogedIn,isAdmin, createProduct);

   


   module.exports={productRouter}
   