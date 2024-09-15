
require('dotenv').config();

const SERVER_PORT = process.env.SERVER_PORT;

const mongobd_url=process.env.mongobd_url ;







module.exports={SERVER_PORT,mongobd_url};