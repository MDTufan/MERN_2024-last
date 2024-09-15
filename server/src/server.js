const { app } = require("./app");
const { connectDB } = require("./config/db");
const { SERVER_PORT } = require("./secret");


app.listen(SERVER_PORT, async()=>{
    console.log(`server is Runing At http://localhost:${SERVER_PORT}`);


    await connectDB();

})