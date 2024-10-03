const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const {  ACCESS_TOKEN_KEY } = require('../secret');

const isLogedIn=async(req,res,next)=>{
    try {
        const acessToken=req.cookies.Access_token;
        
            if(!acessToken){
                throw createError(404,"access token not Found.please logged in")
            }

            const decoded=jwt.verify(acessToken,ACCESS_TOKEN_KEY);
            if(!decoded){
                throw createError(404,"invalid token acccess.please login Fast.");
            
            }
             req.user=decoded.user;
              next()
    } catch (error) {
        return next(error)
    }

}

const isLogedOut=async(req,res,next)=>{
    try {
        const acessToken=req.cookies.Access_token;
        
          if (acessToken) {
           try {
                const decoded=jwt.verify(acessToken,ACCESS_TOKEN_KEY);
                if(decoded){
                    throw createError(404,"user already logged in.");
                }
           } catch (error) {
             throw error;
           }
           
          }
              next()
    } catch (error) {
        return next(error)
    }

}
const isAdmin=async(req,res,next)=>{
    try {
        
            if(!req.user.isAdmin){
                throw createError(40,"Forbident.you must be an admin to access this resouce");
            }

              next()
    } catch (error) {
        return next(error)
    }

}


module.exports={isLogedIn,isLogedOut,isAdmin}