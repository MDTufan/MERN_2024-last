

const express = require("express");
const { getSeedUser } = require("../controller/seedController");
const upload = require("../middleware/uploadFile");

const seedRoute = express.Router();


seedRoute.get("/", upload.single('image'), getSeedUser);

module.exports={seedRoute}