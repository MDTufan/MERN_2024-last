const express = require("express");
const categoryRoute = express.Router();
const { hendleCategory, hendleGetCategory, hendleSingleCategory, hendleUpdateCategory, hendledeleteCategory } = require("../controller/categoryController");
const { validatorCategory } = require("../validators/validationCategory");
const { runValidator } = require("../validators");
const { isLogedIn, isLogedOut, isAdmin } = require("../middleware/auth");


categoryRoute.post("/",validatorCategory,runValidator,isLogedIn,isAdmin ,hendleCategory);
categoryRoute.get("/", hendleGetCategory);
categoryRoute.get("/:slug", hendleSingleCategory);
categoryRoute.put("/:slug", validatorCategory,runValidator,isLogedIn,isAdmin , hendleUpdateCategory);
categoryRoute.delete("/:slug", isLogedIn,isAdmin , hendledeleteCategory);



module.exports={categoryRoute}