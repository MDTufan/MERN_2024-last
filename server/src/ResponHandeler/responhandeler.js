

const errorRespon = (res,{statuscode = 500, message= "internal server Problem"})=>{
   return res.status(statuscode).json({
    success:false,
    message:message
   })


}


module.exports={errorRespon};