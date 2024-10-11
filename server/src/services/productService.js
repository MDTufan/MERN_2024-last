const createError = require('http-errors')
const Products = require("../model/productModel");
const slugify = require('slugify');

const ProductCreate = async (productData)=>{
    const {name,description,price,quantity,shipping,category,imageBufferString}=productData;

    const productExist = await Products.exists({name:name});
    if(productExist){
       throw createError(409,'product width this already exist.');
   }
   
  const Product= await Products.create({
      name:name,
      slug:slugify(name),
      price:price,
      description:description,
      quantity:quantity,
      shipping:shipping,
      image:imageBufferString,
      category:category


  });

  return Product;
}


const getProducts = async (page=1,limit=4,filter={})=>{
     
    const Product = await Products.find(filter)
    .populate("category")
    .limit(limit)
    .skip((page-1)*limit)
    .sort({createdAt: -1})

    if(!Product){
      throw createError(404,"Product not Found")
    }
    const count = await Products.find(filter).countDocuments();

   return {Product,count} ;
}
const getsingleproduct = async (slug)=>{
     
  const singleProduct = await Products.findOne({slug}).populate("category");
  if(!singleProduct){
    throw createError(404," single Product not Found")
  }
   return singleProduct ;
}
const deleteproducts = async (slug)=>{
     
  const deletetProduct = await Products.findOneAndDelete({slug});
  if(!deletetProduct){
    throw createError(404,"  Product not delete")
  }
   return deletetProduct ;
}

module.exports={ProductCreate,getProducts,getsingleproduct,deleteproducts }