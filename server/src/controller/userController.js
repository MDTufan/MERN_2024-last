const createError = require('http-errors')
const { successRespon } = require("../ResponHandeler/responhandeler");
const User = require("../model/userSchama");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { findwithid } = require('../services/findwidthId');
const { deleteimages } = require('../helper/deleteimages');
const JsonWebToken = require('../helper/JsonWebToken');
const { jwt_Key, clind_url } = require('../secret');
const { sendEmailWidhtNodemiler } = require('../helper/email');
const { runValidator } = require('../validators');



const getuser= async (req,res,next)=>{
     try{
    
          const search = req.query.search || "" ;
          const page =Number(req.query.page) || 1 ;
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

     const user = await findwithid(User,id,options)
    
             
      return successRespon(res,{
         statuscode:202,
         message:"User was return successfull",
         payload:{
            user
         }
       })
     
     }catch(error){
      
         next(error)
     }
     
}

const deletuser= async (req,res,next)=>{
    try{
     const id = req.params.id;
     const options={password:0};

     const user= await findwithid(User,id,options)
    
      // const deleteimagePath = user.image;
      //      deleteimages(deleteimagePath) 
           
      await User.findByIdAndDelete({_id:id,isAdmin:false});
      return successRespon(res,{
         statuscode:202,
         message:"User was delete successfull",
         payload:{
            
         }
       })
     
     }catch(error){
      
         next(error)
     }
     
}

const getRegister= async (req,res,next)=>{
    try{

        const {name,email,password,phone,address} = req.body;
        
        const image=req.file;

        if(!image){
          throw new Error ("file not allowerd.....")
        }
        if(image.size > 1024*1024*2){
          throw new Error (" image file is to be large.it must be less 2MB")
        }



        const imageBufferString = image.buffer.toString('base64');


        const userExist = await User.exists({email:email});
         if(userExist){
            throw createError(409,'uaer email already exist.pleass singin...')
        }
        
       
        //jsonwebtoken
        const token = JsonWebToken({name,email,password,phone,address,image:imageBufferString},jwt_Key,'10m');


        //eamildata
        const EmaliData={
            email,
            subject:"Account Acctivion Email",
            html:
            `<h2>Hello ${name} !</h2>
            <p> plase Click Here To <a href="${clind_url}/api/user/activte/${token}">acctive Your Account</a> </p>
            `
          }
    
          try{
            // await sendEmailWidhtNodemiler(EmaliData);
           }catch(error){
             next(createError(500,"send to Fild send email..."))
             return;
           }  
      return successRespon(res,{
         statuscode:202,
         message:` plase go to you ${email} for conpliting your register prossce`,
         payload:{
            token,
            imageBufferString,
         }
       })
     
     }catch(error){
      
         next(error)
     }
     
}
const verifyRegister= async (req,res,next)=>{
    try{

        const token=req.body.token;
         if(!token){
          throw createError(409,"token not found")
         }
       try{
        const decoded=jwt.verify(token,jwt_Key);
        
        if(!decoded){
          throw createError(409,"jwt not verify");
        }

        const userExist = await User.exists({email:decoded.email});

        if(userExist){
            throw createError(409,'uaer email already exist.pleass singin...')
        }
        
        await User.create(decoded);
      return successRespon(res,{
         statuscode:201,
         message:"User was create successfull",
         
       })
       }catch(error){
          if(error.name === 'TokenExpriedError'){
            throw createError(401 ,'Token has expried');
          }else if(error.name === 'JsonWebTokenError'){
            throw createError(401 ,'invlied token');
          }else{
            throw error;
          }
       }
     
     }catch(error){
      
         next(error)
     }
     
}
const updateUserId= async (req,res,next)=>{
  try{
   const id = req.params.id;
   const options={password:0};
   const useroptions={new:true,runValidators:true,context:"query"};
   const updates={};

   await findwithid(User,id,options);


  //  if(req.body.name){
  //   updates.name=req.body.name;
  //  }
   
  //  if(req.body.password){
  //   updates.password=req.body.password;
  //  }
  //  if(req.body.address){
  //   updates.address=req.body.address;
  //  }
  //  if(req.body.phone){
  //   updates.phone=req.body.phone;
  //  }

   
   // ============================
    for(let key in req.body){
      if(['name','password','address','phone'].includes(key)){
        updates[key]=req.body[key];
      }
    }

   // ============================

   const image=req.file;

    if(image){
      if(image.size > 1024*1024*2){
        throw new Error (" image file is to be large.it must be less 2MB");
      }
      updates.image=image.buffer.toString("base64");
    }

  
   const updateUser = await User.findByIdAndUpdate(id,updates,useroptions);
    if(!updateUser){
      throw new Error (" user dose't update");
    }
    return successRespon(res,{
       statuscode:202,
       message:"User was update successfull",
       payload:{
          updateUser
       }
     })
   
   }catch(error){
    
       next(error)
   }
   
}

const updatePassword= async (req,res,next)=>{
  try{

    const {oldPassword,newPassword}=req.body;

    const userid = req.params.id;


   const user = await findwithid(User,userid);
    
   const passwordMach = await bcrypt.compare(oldPassword,user.password);
      if(!passwordMach){
        throw createError(404,"User old password dose not exisit .");
      }


  

  
   const updateUser = await User.findByIdAndUpdate(
    userid,
    {password:newPassword},
    {new:true}
  ).select("-password");
    if(!updateUser){
      throw new Error (" user password dose't update");
    }
    return successRespon(res,{
       statuscode:202,
       message:"User password update successfull",
       payload:{
          user
       }
     })
   
   }catch(error){
    
       next(error)
   }
   
}

const banUserId= async (req,res,next)=>{
  try{
   const id = req.params.id;
   const banUser={isBand:true};
   await findwithid(User,id);
   const useroptions={new:true,runValidators:true,context:"query"};
   
  
   const updateUser = await User.findByIdAndUpdate(id,banUser,useroptions).select("-password");
    if(!updateUser){
      throw new Error (" user dose not Banned.");
    }
    return successRespon(res,{
       statuscode:202,
       message:"User was Banned successfull",
       payload:{
          updateUser
       }
     })
   
   }catch(error){
    
       next(error)
   }
   
}
const unbanUserId= async (req,res,next)=>{
  try{
   const id = req.params.id;
   const banUser={isBand:false};
   await findwithid(User,id);
   const useroptions={new:true,runValidators:true,context:"query"};
   
  
   const updateUser = await User.findByIdAndUpdate(id,banUser,useroptions).select("-password");
    if(!updateUser){
      throw new Error (" user dose not UnBanned.");
    }
    return successRespon(res,{
       statuscode:202,
       message:"User was UnBanned successfull",
       payload:{
          updateUser
       }
     })
   
   }catch(error){
    
       next(error)
   }
   
}
module.exports={getuser,getuserId,deletuser,getRegister,verifyRegister,updateUserId,banUserId,unbanUserId,updatePassword}