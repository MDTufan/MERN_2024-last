
// const createError = require('http-errors');
// const path = require('path');
const multer  = require('multer')

const { 
    UPLOAD_DIR,
   ALLOWER_FILE_TYPE,
    MAX_FILE_SIZE
   } = require('../config');



// const MAX_FILE_SIZE= process.env.MAX_FILE_SIZE || 2097152;
// const ALLOWER_FILE_TYPE= process.env.ALLOWER_FILE_TYPE || ['jpg','JPG','jpeg','png'];
// const uploaddir= process.env.UPLOAD_DIR || '../publice/image/users';

const userStorage = multer.diskStorage(
  {
    destination: function (req, file, cb) {
      cb(null, UPLOAD_DIR)
    },
    filename: function (req, file, cb) {
      
     cb(null,Date.now() + '-' + file.originalname);
    }
  }
);
  

  const fileFilter = (req, file, cb) => {
      
        // if(!file.mimetype.startsWith("image/")){
        //       return cb(new Error("only image file are allowed"),false);
        //   }
       
        // if(file.size > MAX_FILE_SIZE){
        //   return cb(new Error(" file size execed the maximum  limited"),false);
        // }

        if(!ALLOWER_FILE_TYPE.includes(file.mimetype)){
          return cb(new Error(" file type not allowed"),false);
        }
         
          cb(null,true)

      //      try{
      //   const extname = path.extname(file.originalname);
       
      //   if(!ALLOWER_FILE_TYPE.includes(extname.substring(1))){
        
      //       return cb(createError(400,"file type not allower"));
      //   }
      //       cb(null,true);
      //  }catch(error){
      //   console.log(error)
    //  }
 };


  const  upload = multer({ 
   
    storage:userStorage,
    limits:{fileSize:MAX_FILE_SIZE},
    fileFilter:fileFilter
  });

  module.exports=upload;