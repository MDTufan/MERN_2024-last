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
const updateCategory = async (name,slug)=>{
    const filter= {slug};
    const update={ $set:{name:name, slug:slugify(name)}};
    const option= {new:true};
   const UCategory= await Category.findOneAndUpdate(
        filter,
        update,
        option
   );
   return UCategory;
  
}

const deleteCategory = async (slug)=>{
    return await Category.findOneAndDelete({slug});
    
}
module.exports={categoryCreate,getCategory,singleCategory,updateCategory,deleteCategory }