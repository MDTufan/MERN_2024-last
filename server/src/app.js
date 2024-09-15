const express= require("express");
const app = express();

const morgan = require('morgan')

//Midelwer.........

app.use(morgan("dev"));

app.get("/",(req,res)=>{
 res.send("welcone to the server");
});


module.exports={app};