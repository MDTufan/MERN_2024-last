


const getuser=(req,res,next)=>{
                try{
                    
                   res.status(200).json({
                        message:"welcome to server",
                        
                    });
                
                }catch(error)
                {
                next(error)
                }
                }


module.exports={getuser}