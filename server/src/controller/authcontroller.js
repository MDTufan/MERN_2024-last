const createError = require('http-errors')
const User = require("../model/userSchama");
const bcrypt = require('bcryptjs');
const { successRespon } = require('../ResponHandeler/responhandeler');
const JsonWebToken = require('../helper/JsonWebToken');
const { ACCESS_TOKEN } = require('../secret');



const handellogin = async(req,res,next)=>{

 
        try{
       
           const {email,password}=req.body;


           const user = await User.findOne({email});

           if(!user){
            throw createError(404,"User dose not exisit width this email.Plase Register Fast. ");

           }
         
           const passwordMach = await bcrypt.compare(password,user.password);


           if(!passwordMach){
            throw createError(404,"User password dose not exisit .");

           }
           if(user.isBand){
            throw createError(404,"you are Band.plase contact authority.");

           }

           const access_token = JsonWebToken({email},ACCESS_TOKEN,'10m');

           res.cookie('Access_token',access_token,{
               maxAge: 15 * 60 * 1000,
               httpOnly:true,
            //    secure:true,
               sameSite:'none',
           })
                 
          return successRespon(res,{
             statuscode:200,
             message:"User were Return successfull",
             payload:{
                 user
             }
           })
         
         }catch(error){
             next(error)
         }
         
   

}


module.exports={handellogin}