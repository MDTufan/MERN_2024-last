
require('dotenv').config();

const SERVER_PORT = process.env.SERVER_PORT;

const mongobd_url=process.env.mongobd_url || 'mongodb://localhost:27017/MERN_123';







module.exports={SERVER_PORT,mongobd_url};