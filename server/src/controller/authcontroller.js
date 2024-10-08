const createError = require('http-errors')

const User = require("../model/userSchama");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { successRespon } = require('../ResponHandeler/responhandeler');
const JsonWebToken = require('../helper/JsonWebToken');
const { ACCESS_TOKEN_KEY } = require('../secret');
const { setAccesstoken, setRefreshtoken } = require('../helper/allCookies');




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

           const access_token = JsonWebToken({user},ACCESS_TOKEN_KEY,'5m');

          //  res.cookie('Access_token',access_token,{
          //      maxAge: 5 * 60 * 1000,
          //      httpOnly:true,
          //   //    secure:true,
          //      sameSite:'none',
          //  });
            setAccesstoken(res,access_token);

           const refreshtoken = JsonWebToken({user},ACCESS_TOKEN_KEY,'7d');

          //  res.cookie('refreshtoken',refreshtoken,{
          //      maxAge: 7 * 24 * 60 * 60 * 1000,
          //      httpOnly:true,
          //   //    secure:true,
          //      sameSite:'none',
          //  })
          setRefreshtoken(res,refreshtoken);



           const widthoutpassword = user.toObject();
           delete widthoutpassword.password;


                 
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
          res.clearCookie("refreshtoken");
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

const handelrefreshtoken = async(req,res,next)=>{

 
  try{


      const oldRefreshToken=req.cookies.refreshtoken;
      console.log("hhhhhhhhh");
      const decoded = jwt.verify(oldRefreshToken,ACCESS_TOKEN_KEY);
      
        if(!decoded){
          throw createError(409,"invalied refresh token.");
        }
        
        
        const access_token = JsonWebToken(decoded.user,ACCESS_TOKEN_KEY,'5m');

           res.cookie('Access_token',access_token,{
               maxAge: 5 * 60 * 1000,
               httpOnly:true,
            //    secure:true,
               sameSite:'none',
           });


    return successRespon(res,{
       statuscode:200,
       message:"Create new Refresh Token successfull",
       payload:{
          
       }
     })
   
   }catch(error){
       next(error)
   }
   


}
const handelprotectedRoute = async(req,res,next)=>{

 
  try{


      const accesstoken=req.cookies.Access_token;

      const decoded=jwt.verify(accesstoken,ACCESS_TOKEN_KEY);
        
        if(!decoded){
          throw createError(409,"invalied refresh token.please login.");
        }
        
       


    return successRespon(res,{
       statuscode:200,
       message:"Create new Refresh Token verify successfull",
       payload:{
          
       }
     })
   
   }catch(error){
       next(error)
   }
   


}

module.exports={handellogin,handellogout,handelrefreshtoken,handelprotectedRoute}