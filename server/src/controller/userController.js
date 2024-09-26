const createError = require('http-errors')
const { successRespon } = require("../ResponHandeler/responhandeler");
const User = require("../model/userSchama");
const { default: mongoose } = require('mongoose');


const getuser= async (req,res,next)=>{
     try{
    
          const search=req.query.search || "" ;
          const page=Number(req.query.page) || 1 ;
          const limit=Number(req.query.limit) || 5 ;
          const searchRegx= new RegExp('.*' + search + '.*',"i" );
      
          const filter={
              isAdmin : { $ne : true},
              $or : [
                  {name:{$regex:searchRegx}},
                  {email:{$regex:searchRegx}},
                  {phone:{$regex:searchRegx}},
              ]
          }
      
          const options={password:0};
      
      
          const users= await User.find( filter,options)
          .limit(limit)
          .skip((page-1)*limit);
      
          const count = await User.find(filter).countDocuments();
      
          if(!users) throw createError(404,"No User Found");
      
              
       return successRespon(res,{
          statuscode:200,
          message:"User were Return successfull",
          payload:{
              users,
              pagination:{
                  totalpage:Math.ceil(count / limit),
                  ccurrentpage: page,
                  previouspage: page - 1 > 0 ? page - 1 : null,
                  nextpage: page + 1 <= Math.ceil(count / limit)? page + 1 : null,
      
              }
          }
        })
      
      }catch(error){
          next(error)
      }
      
}

const getuserId= async (req,res,next)=>{
    try{
     const id = req.params.id;
     const options={password:0};


       const user = await User.findByIdAndDelete(id,options)  ;   
      if(!user){throw createError(404,"No User Found")}
       
             
      return successRespon(res,{
         statuscode:202,
         message:"User was delete successfull",
         payload:{
            user
         }
       })
     
     }catch(error){
        if(error instanceof mongoose.Error){
            next (createError(404,"Invalid User id"));
            return;
              
          }
         next(error)
     }
     
}



module.exports={getuser,getuserId}