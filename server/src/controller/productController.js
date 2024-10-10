const createError = require('http-errors')
const Products = require("../model/productModel");

const { successRespon } = require('../ResponHandeler/responhandeler');
const { ProductCreate, getProducts, getsingleproduct } = require('../services/productService');


const createProduct = async(req,res,next)=>{
    try{

        const {name,description,price,quantity,shipping,category} = req.body;
        
        const image=req.file;

        if(!image){
          throw new Error ("file not allowerd.....")
        }
        if(image.size > 1024*1024*2){
          throw new Error (" image file is to be large.it must be less 2MB")
        }

         

        const imageBufferString = image.buffer.toString('base64');

        const productData = {
            name,
            description,
            price,
            quantity,
       
            shipping,
            category,
            imageBufferString
          }  
          const Product = await ProductCreate(productData);
    

      return successRespon(res,{
         statuscode:202,
         message:'product was create successfully',
         payload:{
            Product
         }
       })
     
     }catch(error){
      
         next(error)
     }
     
}
const getAllProduct = async(req,res,next)=>{
    try{
      const page = parseInt(req.query.page) || 1 ;
      const limit= parseInt(req.query.limit) || 4 ;
     
     const productsdata = await getProducts(page,limit);

      return successRespon(res,{
         statuscode:202,
         message:'Get All product was successfully',
         payload:{
            Product:productsdata.Product,
            pagination:{
              
              totalpage:Math.ceil(productsdata.count / limit),
              ccurrentpage: page,
              previouspage: page - 1 ,
              nextpage: page + 1 ,
              tolalNumberOfProducts:productsdata.count,
   
          }

         }
       })
     
     }catch(error){
      
         next(error)
     }
     
}
const getsingleProduct = async(req,res,next)=>{
    try{
      
      const {slug} =req.params;  

      const singleProduct =await getsingleproduct(slug);
      return successRespon(res,{
         statuscode:202,
         message:'single product was successfully',
         payload:{
            singleProduct,
            
         }
       })
     
     }catch(error){
      
         next(error)
     }
     
}


module.exports={createProduct,getAllProduct,getsingleProduct}