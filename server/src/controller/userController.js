const { users } = require("../model/userModel");


const getuser=(req,res,next)=>{
try{
    res.json({
        message:"welcome to server",
        users
    });
   
}catch(error)
{
next(error)
}
}


module.exports={getuser}