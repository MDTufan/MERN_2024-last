const createError = require('http-errors')
const { successRespon } = require("../ResponHandeler/responhandeler");
const User = require("../model/userSchama");
const jwt = require('jsonwebtoken');

const { findwithid } = require('../services/findwidthId');
const { deleteimages } = require('../helper/deleteimages');
const JsonWebToken = require('../helper/JsonWebToken');
const { jwt_Key, clind_url } = require('../secret');
const { sendEmailWidhtNodemiler } = require('../helper/email');



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
    
      const deleteimagePath = user.image;
           deleteimages(deleteimagePath) 
           
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


        const userExist = await User.exists({email:email});

        if(userExist){
            throw createError(409,'uaer email already exist.pleass singin...')
        }
        
       
        //jsonwebtoken
        const token = JsonWebToken({name,email,password,phone,address},jwt_Key,'10m');


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
            token
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


module.exports={getuser,getuserId,deletuser,getRegister,verifyRegister}