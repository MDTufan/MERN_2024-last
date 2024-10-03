const { data } = require("../data");
const User = require("../model/userSchama");


const getSeedUser= async (req,res,next)=>{
    
    try{
        
        await User.deleteMany({});

        const user = await User.insertMany(data.users);

        return res.status(201).json(user)

    }catch(error){
        next(error)
    }

}

module.exports={getSeedUser}