const { data } = require("../data");
const User = require("../model/userSchama");
const Product = require("../model/productModel");


const getSeedUser= async (req,res,next)=>{
    
    try{
        
        await User.deleteMany({});

        const user = await User.insertMany(data.users);

        return res.status(201).json(user)

    }catch(error){
        next(error)
    }

}
const seedproduct= async (req,res,next)=>{
    
    try{
        
        await Product.deleteMany({});

        const product = await Product.insertMany(data.products);

        return res.status(201).json(product)

    }catch(error){
        next(error)
    }

}

module.exports={getSeedUser,seedproduct}