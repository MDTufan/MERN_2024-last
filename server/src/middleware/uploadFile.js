const { log } = require('console');
const createError = require('http-errors');
const multer  = require('multer')
const path =require("path");



const MAX_FILE_SIZE= process.env.MAX_FILE_SIZE || 2097152;
const ALLOWER_FILE_TYPE= process.env.ALLOWER_FILE_TYPE || ['jpg','JPG','jpeg','png'];
const uploaddir= process.env.UPLOAD_DIR || '../publice/image/users';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploaddir)
    },
    filename: function (req, file, cb) {
     const extname = path.extname(file.originalname);
     cb(null,Date.now() + '-' + file.originalname.replace(extname,'') + extname);
    }
  });
  

  const fileFilter = (req, file, cb)=>{
       try{
        const extname = path.extname(file.originalname);
        console.log("hhhhhhhhhhhhh")
        if(!ALLOWER_FILE_TYPE.includes(extname.substring(1))){
        
            return cb(createError(400,"file type not allower"));
        }
            cb(null,true);
       }catch(error){
        console.log(error)
       }
 };


  const upload = multer({ 
   
    storage: storage,
    limits: {fileSize : MAX_FILE_SIZE },
    fileFilter
  });

  module.exports=upload;