const Category = require("../model/categorySchama");
const slugify = require('slugify');

const categoryCreate = async (name)=>{
    const newCategory= await Category.create({
        name: name,
        slug: slugify(name.toString()),
    });
    return newCategory;
}

const getCategory = async ()=>{
    return await Category.find({}).select("name slug").lean();
    
}
const singleCategory = async (slug)=>{
    return await Category.find({slug}).select("name slug").lean();
    
}
module.exports={categoryCreate,getCategory,singleCategory}