const jwt = require('jsonwebtoken');

const JsonWebToken=(payload,secretkey,expiresIn)=>{

    if (typeof payload !== "object" || !payload){
        throw new Error("payload must be Non Empty Object");
     }
     if (typeof secretkey !== "string" || secretkey == ""){
        throw new Error("payload must be Non Empty string");
     }
    

    const token = jwt.sign(payload, secretkey,{expiresIn});


    return token;
}

module.exports=JsonWebToken;