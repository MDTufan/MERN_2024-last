const express = require("express");
const categoryRoute = express.Router();
const { hendleCategory, hendleGetCategory, hendleSingleCategory } = require("../controller/categoryController");
const { validatorCategory } = require("../validators/validationCategory");
const { runValidator } = require("../validators");
const { isLogedIn, isLogedOut, isAdmin } = require("../middleware/auth");


categoryRoute.post("/",validatorCategory,runValidator,isLogedIn,isAdmin ,hendleCategory);
categoryRoute.get("/", hendleGetCategory);
categoryRoute.get("/:slug", hendleSingleCategory);



module.exports={categoryRoute}