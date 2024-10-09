
const{Schema,model, }=require("mongoose");




const categorySchama = new Schema({
    name:{
        type:String,
        required:[true,"Category name is Required"],
        unique:true,
        minlength:[3,"Category name must be 6 chercect now"],
        
   
    },
    slug:{
        type:String,
        
        required:[true,"Category name is Required"],
        lowercase:true,
        unique:true,
       
        
    },
   


},{timestamps:true} );

const Category =  model("Category",categorySchama);

module.exports = Category;
