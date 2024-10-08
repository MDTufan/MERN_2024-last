
const setAccesstoken = (res,access_token)=>{
    res.cookie('Access_token',access_token,{
        maxAge: 5 * 60 * 1000,
        httpOnly:true,
     //    secure:true,
        sameSite:'none',
    });
}
const setRefreshtoken = (res,refreshtoken)=>{
    res.cookie('refreshtoken',refreshtoken,{
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly:true,
     //    secure:true,
        sameSite:'none',
    })      
}

module.exports={setAccesstoken,setRefreshtoken};