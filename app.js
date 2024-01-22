const express = require("express");
const socket = require("socket.io");
const path=require("path")
const cookieParser=require("cookie-parser")

const {connectMongoDb}= require("./connection")

const staticRouter = require("./routes/staticRouter")
const userRoute = require("./routes/user")
const urlId=require("./routes/urlId")
const homeRoute=require("./routes/homeRoute")
const {restrictToLoggedinUserOnly}= require('./middleware/auth')



const bodyParser = require('body-parser')
const app = express();

connectMongoDb("mongodb://127.0.0.1:27017/real-time-whiteboard").then(()=>
console.log("Mongodb connected!")
)

app.use(express.json())

app.set("view engine","ejs");
app.set("views",path.resolve("./views"))
app.use('/id/room', express.static(path.join(__dirname, "views")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/user",userRoute)
app.use("/id",urlId)
app.use("/home",restrictToLoggedinUserOnly,homeRoute)
app.use("/",staticRouter)




  
let port = process.env.PORT || 3000;
let server = app.listen(port, () => {
  console.log("Listening to the port : " + port);
});

let io = socket(server);

io.on("connection", (socket) => {
  console.log("Made Socket Connection");

  socket.on('joinRoom', (roomId) => {
    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);
  });
  // Recieved data from one computer to server
  socket.on("beginPath", (data) => {
    // Sending the same data to other computer from server
    io.sockets.in(data.roomId).emit("beginPath", data.data);
  });
  socket.on("drawStroke", (data) => {
    io.sockets.in(data.roomId).emit("drawStroke", data.data);
  });
  socket.on("undoRedo", (data) => {
    io.sockets.in(data.roomId).emit("undoRedo", data.data);
  });

  socket.on("createSticky", (data) => {
    io.sockets.in(data.roomId).emit("createSticky", data.data);
  });
  socket.on("createSticky1", (data) => {
    io.sockets.in(data.roomId).emit("createSticky1", data.data);
  });
  socket.on("textareaContent", (data) => {
    io.sockets.in(data.roomId).emit("updateContent", data.data);
  });
  socket.on("closeNoteAction", (data) => {
    io.sockets.in(data.roomId).emit("closeNoteAction", data.data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});
