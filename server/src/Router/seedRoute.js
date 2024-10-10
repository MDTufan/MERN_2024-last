

const express = require("express");
const { getSeedUser, seedproduct } = require("../controller/seedController");
const upload = require("../middleware/uploadFile");

const seedRoute = express.Router();


seedRoute.get("/", upload.single('image'), getSeedUser);
seedRoute.get("/product", upload.single('image'), seedproduct);

module.exports={seedRoute}