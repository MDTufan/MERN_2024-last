

const express = require("express");
const { getSeedUser } = require("../controller/seedController");
const seedRoute = express.Router();


seedRoute.get("/",getSeedUser);

module.exports={seedRoute}