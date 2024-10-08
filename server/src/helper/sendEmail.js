const createError = require('http-errors')
const { sendEmailWidhtNodemiler } = require("./email");


const sendEmail = async(EmaliData)=>{
    try{
        await sendEmailWidhtNodemiler(EmaliData);
       }catch(error){
        throw createError(500,"send to Fild send email...")
         
       } 

}

module.exports=sendEmail;