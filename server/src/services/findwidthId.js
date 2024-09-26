const { default: mongoose, model } = require("mongoose");
const User = require("../model/userSchama");
const createError = require('http-errors')


const findwithid = async (Model, id,options={})=>{
try{
    const item = await Model.findById(id,options); 

      if(!item){throw createError(404,`${Model.modelName} do not exist width this id`)};

      return item;
       
}catch(error){
    if(error instanceof mongoose.Error){
        
        throw (createError(404,"Invalid item id"));
       
          
      }
      throw error
}


}

module.exports={findwithid}