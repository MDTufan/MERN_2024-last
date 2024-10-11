const createError = require('http-errors')
const Products = require("../model/productModel");
const slugify = require('slugify');

const { successRespon } = require('../ResponHandeler/responhandeler');
const { ProductCreate, getProducts, getsingleproduct, deleteproducts } = require('../services/productService');


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
      const search = req.query.search || "" ;
      const page = parseInt(req.query.page) || 1 ;
      const limit= parseInt(req.query.limit) || 4 ;

      const searchRegx= new RegExp('.*' + search + '.*',"i" );
      
      
      
       const filter = {
              $or: [
                  {name:{$regex:searchRegx}},
                  
              ],
          };
         
     const productsdata = await getProducts(page,limit,filter);

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
const deleteProduct = async(req,res,next)=>{
    try{
      
      const {slug} =req.params;  

      await deleteproducts(slug);
      return successRespon(res,{
         statuscode:202,
         message:' product was Delete successfully',
        
       })
     
     }catch(error){
      
         next(error)
     }
     
}
const updateProduct = async(req,res,next)=>{
  try{
    const {slug}= req.params;
    
    const useroptions={new:true,runValidators:true,context:"query"};
    const updates={};
 
    // await findwithid(User,id,options);
 
 
   //  if(req.body.name){
   //   updates.name=req.body.name;
   //  }
    
   //  if(req.body.password){
   //   updates.password=req.body.password;
   //  }
   //  if(req.body.address){
   //   updates.address=req.body.address;
   //  }
   //  if(req.body.phone){
   //   updates.phone=req.body.phone;
   //  }
 
    
    // ============================
 
    const allowerfield=['name','description','price','quantity','shipping','category'];
    
     for(const key in req.body){
       if(allowerfield.includes(key)){
         updates[key]=req.body[key];
       }
     }
 
    // ============================

    if(updates.name){
        updates.slug=slugify(updates.name );
       }
     
    const image=req.file;
 
     if(image){
       if(image.size > 1024*1024*2){
         throw new Error (" image file is to be large.it must be less 2MB");
       }
       updates.image=image.buffer.toString("base64");
     }
 
   
    const updateproduct = await Products.findOneAndUpdate({slug},updates,useroptions);
     if(!updateproduct){
       throw new Error (" user dose't update");
     }
     return successRespon(res,{
        statuscode:202,
        message:"product was update successfull",
        payload:{
           updateproduct
        }
      })
    
    }catch(error){
     
        next(error)
    }
    
     
}


module.exports={createProduct,getAllProduct,getsingleProduct,deleteProduct,updateProduct}