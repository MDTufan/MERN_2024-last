

const fs = require("fs/promises");

const deleteimages= async(imagePath)=>{
        
    try{
        console.log("ttttttt");
        
        await fs.access(imagePath);
        await fs.unlink(imagePath);
        console.log("images  delete successfull");

    }catch(error){
        console.error("user images dosen't exsit");
        console.log(error);

}



}
module.exports={deleteimages}