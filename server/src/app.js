const express= require("express");
const app = express();
const createError = require('http-errors')
const bodyParser = require('body-parser')

const morgan = require('morgan');
const { userRouter } = require("./Router/userRouter");
const { seedRoute } = require("./Router/seedRoute");
const { errorRespon } = require("./ResponHandeler/responhandeler");

//Midelwer.........

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));


// all Router .....
app.use("/api/user",userRouter);
app.use("/api/seed",seedRoute);

//clind error
app.use((req,res,next)=>{

    next(createError(404,"Route not Found"));
 
});

//server error
app.use((err, req, res, next) => {
   

    return errorRespon(res,{
        statuscode:err.status,
        message:err.message
    })
  })




module.exports={app};