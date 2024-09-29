const jwt = require('jsonwebtoken');

const JsonWebToken=(payload,secretkey,expiresIn)=>{

    const token = jwt.sign(payload, secretkey,{expiresIn});


    return token;
}

module.exports=JsonWebToken;