const createError = require('http-errors')

const { successRespon } = require("../ResponHandeler/responhandeler");
const { categoryCreate, getCategory, singleCategory, updateCategory, deleteCategory } = require("../services/categoryService");



const hendleCategory= async(req,res,next)=>{

    try {
            const {name} = req.body;
          
        //   const newCategory= await Category.create({
        //         name: name,
        //         slug:slugify(name),
             
        // });
           
     const newCategory= await  categoryCreate(name);

        return successRespon(res,{
            statuscode:202,
            message:"Category Create successfull",
            payload:{newCategory},
        })
    } catch (error) {
        next(error)
    }

}
const hendleGetCategory= async(req,res,next)=>{

    try {
           
           
     const CategoryFatch= await getCategory();

        return successRespon(res,{
            statuscode:202,
            message:"Category Fatch successfull",
            payload:{CategoryFatch},
        })
    } catch (error) {
        next(error)
    }

}
const hendleSingleCategory= async(req,res,next)=>{

    try {
           
      const {slug} =req.params;  

     const Categorysingle = await singleCategory(slug);

        // if(!Categorysingle){
        //     throw createError(404,"single category not found")
        // }
        return successRespon(res,{
            statuscode:202,
            message:"Category Fatch successfull",
            payload:{Categorysingle},
        })
    } catch (error) {
        next(error)
    }

}

const hendleUpdateCategory= async(req,res,next)=>{

    try {
            const {name} = req.body;
            const {slug} =req.params;   
           
     const update= await updateCategory(name,slug);

        if(!update){
            throw createError(404 ,"category not found ")
        }
        return successRespon(res,{
            statuscode:202,
            message:"Category update successfull",
            payload:{update},
        })
    } catch (error) {
        next(error)
    }

}
const hendledeleteCategory= async(req,res,next)=>{

    try {
            
            const {slug} =req.params;   
           
     const deleteSlug = await deleteCategory(slug);

        if(!deleteSlug){
            throw createError(404 ,"category not delete ")
        }
        return successRespon(res,{
            statuscode:202,
            message:"Category was Delete successfull",
            payload:{deleteSlug},
        })
    } catch (error) {
        next(error)
    }

}

module.exports={hendleCategory,hendleGetCategory,hendleSingleCategory,hendleUpdateCategory,hendledeleteCategory}
    
