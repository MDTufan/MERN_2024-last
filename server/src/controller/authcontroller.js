const createError = require('http-errors')
const User = require("../model/userSchama");
const bcrypt = require('bcryptjs');
const { successRespon } = require('../ResponHandeler/responhandeler');
const JsonWebToken = require('../helper/JsonWebToken');
const { ACCESS_TOKEN_KEY } = require('../secret');




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

           const access_token = JsonWebToken({user},ACCESS_TOKEN_KEY,'15m');

           res.cookie('Access_token',access_token,{
               maxAge: 15 * 60 * 1000,
               httpOnly:true,
            //    secure:true,
               sameSite:'none',
           })

           const widthoutpassword = await User.findOne({email}).select("-password");


                 
          return successRespon(res,{
             statuscode:200,
             message:"User were Return successfull",
             payload:{
              widthoutpassword
             }
           })
         
         }catch(error){
             next(error)
         }
         
   

}
const handellogout = async(req,res,next)=>{

 
        try{


            res.clearCookie("Access_token");
       
          return successRespon(res,{
             statuscode:200,
             message:"User LogOut successfull",
             payload:{
                
             }
           })
         
         }catch(error){
             next(error)
         }
         
   

}


module.exports={handellogin,handellogout}