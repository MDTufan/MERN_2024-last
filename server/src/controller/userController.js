const { successRespon } = require("../ResponHandeler/responhandeler")
const User = require("../model/userSchama")


const getuser= async (req,res,next)=>{
     try{
                    
                
        const users = await User.find();
        return successRespon(res,{
             statuscode:200,
             message:"welcome to server",
             users
        })
                
    }catch(error)
         {
         next(error)
         }
}


module.exports={getuser}