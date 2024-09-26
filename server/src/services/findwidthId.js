const { default: mongoose } = require("mongoose");
const User = require("../model/userSchama");
const createError = require('http-errors')


const findwithid = async ( id,options={})=>{
try{
    const user = await User.findByIdAndDelete(id,options); 

      if(!user){throw createError(404,"No User Found")};

      return user;
       
}catch(error){
    if(error instanceof mongoose.Error){
        
        throw (createError(404,"Invalid User id"));
       
          
      }
      throw error
}


}

module.exports={findwithid}