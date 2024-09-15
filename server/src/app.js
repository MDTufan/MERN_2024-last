const express= require("express");
const app = express();
const createError = require('http-errors')

const morgan = require('morgan');
const { userRouter } = require("./Router/userRouter");

//Midelwer.........

app.use(morgan("dev"));
app.use("/api/user",userRouter);


app.use((req,res,next)=>{

    next(createError(404,"Route not Found"));
 
});


app.use((err, req, res, next) => {
    return res.status(err.status || 500).json({
        sucess:false,
        message:err.message
    })
  })




module.exports={app};