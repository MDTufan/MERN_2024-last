const fs=require("fs").promises;

const deleteimages= async()=>{
        
    try{
        await fs.access(userImagePath);
        await fs.unlink(userImagePath);
        console.log("images i delete successfull");

    }catch(error){
        console.error("user images dosen't exsit");

}



}
module.exports={deleteimages}