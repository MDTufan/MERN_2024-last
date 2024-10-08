const User = require("../model/userSchama");

const cheackUserExisit=async(email)=>{
  return await User.exists({email:email});
  
};


module.exports={cheackUserExisit}