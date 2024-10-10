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



module.exports={ProductCreate }