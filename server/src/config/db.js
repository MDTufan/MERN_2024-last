const mongoose = require('mongoose');
const { mongobd_url } = require('../secret');

const connectDB= async (options={})=>{
    try{
        await mongoose.connect(mongobd_url,options);
    
        console.log("connect to DB is successfull established...");
        mongoose.connection.on("error",(error)=>{
            console.error("db connect error", error);
        })

    }catch(error){
      console.error("could not connect to db ", error.toString());
    }


}

module.exports={connectDB};