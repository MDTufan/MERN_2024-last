
const{Schema,model, }=require("mongoose");
const bcrypt = require('bcryptjs');
const { defaultImagePath } = require("../secret");



const userSchema = new Schema({
    name:{
        type:String,
        required:[true,"User name is Required"],
        trim:true,
        minlength:[6,"user name must be 6 chercect now"],
        maxlength:[31,"user name must be 31  chercect now"],
    },
    email:{
        type:String,
        required:[true,"User name is Required"],
        trim:true,
        unique:true,
        lowercase:true,
       
        validate: {
            validator: function(v) {
              return /^([a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$)/.test(v);
              message: "plase inter a valide email";
            },
            
          },
    },
   password:{
        type:String,
        required:[true,"User name is Required"],
        trim:true,
        minlength:[6,"user name must be 6 chercect now"],
        set:(v)=>bcrypt.hashSync(v,bcrypt.genSaltSync(10)),
        
    },
    image:{

        type:Buffer,
        contentType:String,
        required:[true,"image file is required..."],
        
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    phone:{
        type:String,
        required:[true,"phone number is req..."],
        

    },
    isBand:{
        type:Boolean,
        default:false,
    },

    address:{
         type:String,
         required:[true,"User Address is Required"],  
         minlength:[3,"user name must be 6 chercect now"],
    },
},{timestamps:true} );

const User =  model("users",userSchema);

module.exports = User;
