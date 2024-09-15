const express= require("express");
const app = express();
const createError = require('http-errors')

const morgan = require('morgan')

//Midelwer.........

app.use(morgan("dev"));

app.get("/",(req,res)=>{
 res.send("welcone to the server");
});



app.use((req,res,next)=>{

    next(createError(404,"Route not Found"));
 
});


app.use((err, req, res, next) => {
    // console.error(err.stack)
    // res.status(500).send('Something broke!')

    return res.status(err.status || 500).json({
        sucess:false,
        message:err.message
    })
  })




module.exports={app};