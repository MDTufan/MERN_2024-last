
const express = require ("express");
const { createProduct, getAllProduct, getsingleProduct } = require("../controller/productController");
const productRouter =express.Router();
const upload = require("../middleware/uploadFile");
const { validatorProduct } = require("../validators/validationProduct");
const { runValidator } = require("../validators");
const { isLogedIn, isAdmin } = require("../middleware/auth");




productRouter.post("/", upload.single('image'),validatorProduct, runValidator,isLogedIn,isAdmin, createProduct);

productRouter.get("/",  getAllProduct);
productRouter.get("/:slug",  getsingleProduct);

   


   module.exports={productRouter}
   