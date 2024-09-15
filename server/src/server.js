const { app } = require("./app");
const { SERVER_PORT } = require("./secret");


app.listen(SERVER_PORT,()=>{
    console.log(`server is Runing At http://localhost:${SERVER_PORT}`);
})