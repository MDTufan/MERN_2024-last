

const fs=require("fs").promises;

const deleteimages= async(deleteimagePath )=>{
        
    try{
        await fs.access(deleteimagePath );
        await fs.unlink(deleteimagePath );
        console.log("images  delete successfull");

    }catch(error){
        console.error("user images dosen't exsit");
        console.log(error);

}



}
module.exports={deleteimages}