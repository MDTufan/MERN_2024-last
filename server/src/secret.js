
require('dotenv').config();



const SERVER_PORT = process.env.SERVER_PORT;

const mongobd_url=process.env.mongobd_url || 'mongodb://localhost:27017/MERN_123';

const defaultImagePath= process.env.dufalt_image_path || "../publice/image/users/35.JPG";







module.exports={SERVER_PORT,mongobd_url,defaultImagePath};