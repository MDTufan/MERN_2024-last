
require('dotenv').config();



const SERVER_PORT = process.env.SERVER_PORT;

const mongobd_url=process.env.mongobd_url || 'mongodb://localhost:27017/MERN_123';

const defaultImagePath= process.env.dufalt_image_path || "../publice/image/users/35.JPG";


const jwt_Key=process.env.jwt_Key || "gyrfdffttyhh#hjj$%#677645";

const smtp_username=process.env.SMTP_USERNAME;
const smtp_password=process.env.SMTP_PASSWORD;
const clind_url=process.env.clind_url || 'http://localhost:3000';




module.exports={SERVER_PORT,mongobd_url,defaultImagePath,jwt_Key,smtp_username,smtp_password,clind_url};