

const nodemailer = require("nodemailer");
const { smtp_username, smtp_password } = require("../secret");


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: smtp_username,
      pass: smtp_password,
    },
  });



  const sendEmailWidhtNodemiler= async(EmaliData)=>{
    try{
        const mailoption={
            from: smtp_username, // sender address
            to:EmaliData.email, // list of receivers
            subject: EmaliData.subject, // Subject line
           
            html: EmaliData.html, // html body
    
        }
        const info =await transporter.sendMail(mailoption)
        console.log("message email transfer", info.response)
    }catch(error){
      console.error("send maill error",error)
      throw error;
    }
  }

  module.exports ={sendEmailWidhtNodemiler}