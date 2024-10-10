
const{Schema,model, }=require("mongoose");




const productSchema = new Schema({
    name:{
        type:String,
        required:[true,"User name is Required"],
        trim:true,
        minlength:[3,"user name must be 6 chercect now"],
        maxlength:[150,"user name must be 150  chercect now"],
    },
    slug:{
        type:String,
        required:[true,"product slug name is Required"],
        lowercase:true,
        unique:true,
       
        
    },
    description:{
        type:String,
        required:[true,"product description is Required"],
        unique:true,
        length:[3,"user name must be 6 chercect now"],
       
        
    },
    price:{
        type:Number,
        required:[true,"product price is Required"],
        trim:true,
        validate:{
            validator:(v)=> v > 0,
            message:(props)=>
                `${props.value} is not a valid price. price must be greater then 0.`
            
        }
       
        
    },
    quantity:{
        type:Number,
        required:[true,"product quantity is Required"],
        trim:true,
        validate:{
            validator:(v)=> v > 0,
            message:(props)=>
                `${props.value} is not a valid quantity. quantity must be greater then 0.`
            
        }
       
        
    },
    // sold:{
    //     type:Number,
      
    //     trim:true,
    //     default:0,
    //     validate:{
    //         validator:(v)=> v > 0,
    //         message:(props)=>
    //             `${props.value} is not a valid sold. sold must be greater then 0.`
            
    //     }
     
    // },
    shipping:{
        type:Number,
        default:0,

       
    },
    image:{

        type:Buffer,
        contentType:String,
        required:[true," product image file is required..."],
       
        
    },

    category:{
        type:Schema.Types.ObjectId,
        ref:"Category",
        
        required:true, 
    }
},{timestamps:true} );

const Products =  model("Products", productSchema);

module.exports = Products;
