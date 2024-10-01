
const {validationResult} =require("express-validator");
const { errorRespon } = require("../ResponHandeler/responhandeler");

const runValidator= async (req,res,next)=>{
  try {
  const errors=validationResult(req);

        if(!errors.isEmpty()){
          console.log(errors.array()[0].msg)
            return errorRespon(res,{
                statuscode:200,
                message:errors.array()[0].msg,

            })
        }
    return next()
  } catch (error) {
    return next(error)
  }
}



module.exports={runValidator}