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

const getProducts = async (page=1,limit=4)=>{
     
    const Product = await Products.find({})
    .populate("category")
    .limit(limit)
    .skip((page-1)*limit)
    .sort({createdAt: -1})

    if(!Product){
      throw createError(404,"Product not Found")
    }
    const count = await Products.find({}).countDocuments();

   return {Product,count} ;
}


module.exports={ProductCreate,getProducts }