const { log } = require("console");
const express=require("express");
const socket=require("socket.io");

const app=express();

app.use(express.static("front_end"));

let port=process.env.PORT || 3000;
let server=app.listen(port,()=>{
    console.log("Listening to the port : " + port);
})

let io= socket(server);

io.on("connection",(socket)=>{
    console.log("Made Socket Connection");

    // Recieved data from one computer to server
    socket.on("beginPath",(data)=>{
        // Sending the same data to other computer from server
        io.sockets.emit("beginPath",data);
    })
    socket.on("drawStroke",(data)=>{
        io.sockets.emit("drawStroke",data);
    })
    socket.on("undoRedo",(data)=>{
        io.sockets.emit("undoRedo",data);
    })

    socket.on("createSticky",(data)=>{
        io.sockets.emit("createSticky",data);
    })
})