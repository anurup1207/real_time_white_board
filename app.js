const { log } = require("console");
const express=require("express");
const socket=require("socket.io");

const app=express();

app.use(express.static("front_end"));

let port=3000;
let server=app.listen(port,()=>{
    console.log("Listening to the port : " + port);
})

let io= socket(server);

io.on("connection",(socket)=>{
    console.log("Made Socket Connection");
})