

const errorRespon = (res,{statuscode = 500, message= "internal server Problem"})=>{
   return res.status(statuscode).json({
    success:false,
    message:message
   })


}
const successRespon = (res,{statuscode = 200, message= "success"})=>{
   return res.status(statuscode).json({
    success:true,
    message:message
   })


}


module.exports={errorRespon,successRespon};