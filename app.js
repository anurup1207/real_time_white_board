const express = require("express");
const socket = require("socket.io");
const path = require("path");
const cookieParser = require("cookie-parser");
const connectEnsureLogIn= require("connect-ensure-login");
require('dotenv').config()



const {intializingLogInPassport, isAuthenticated, intializingSignInPassport}=require('./middleware/passport')
const { initializingGooglePassport } = require("./middleware/google_auth");

const session = require("express-session");
const MongoStore= require("connect-mongo");

const { connectMongoDb } = require("./connection");

const staticRouter = require("./routes/staticRouter");
const userRoute = require("./routes/user");
const urlId = require("./routes/urlId");
const homeRoute = require("./routes/homeRoute");
const googleAuthRoute = require("./routes/googleAuthRoute")
const { restrictToLoggedinUserOnly } = require("./middleware/local_auth");

const bodyParser = require("body-parser");
const passport = require("passport");

const app = express();


const UrlToConnectMongo="mongodb://127.0.0.1:27017/real-time-whiteboard";

connectMongoDb(UrlToConnectMongo).then(() =>
  console.log("Mongodb connected!")
);

intializingLogInPassport(passport);
intializingSignInPassport(passport);
initializingGooglePassport(passport);


// Passport library for Authentication
app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    store:MongoStore.create({ mongoUrl : UrlToConnectMongo, collectionName : "sessions" }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 },
    cookie:{secure:false},
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use("/id/room", express.static(path.join(__dirname, "views")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());



// All my routes
app.use("/user", userRoute);
app.use("/id",connectEnsureLogIn.ensureLoggedIn('/login'), urlId);
app.use("/home",connectEnsureLogIn.ensureLoggedIn('/login'), homeRoute);
app.use("/", staticRouter);
app.use("/google",googleAuthRoute);


// Listening to Server at PORT
let port = process.env.PORT || 3000;
let server = app.listen(port, () => {
  console.log("Listening to the port : " + port);
});




const roomUsers={};

// Socket Code Part

let io = socket(server);

io.on("connection", (socket) => {
  console.log("Made Socket Connection");

  socket.on("joinRoom", (roomId,user,user_email) => {
    socket.username=user;
    socket.join(roomId);
    if (!roomUsers[roomId]) {
      roomUsers[roomId] = [];
    }
    roomUsers[roomId].push(user);
    // Broadcast the updated user list to all clients in the room
    io.sockets.in(roomId).emit("updateUserList",roomUsers[roomId])

    console.log(roomUsers);
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

  socket.on("disconnect", () => {
    console.log("User disconnected");
    Object.keys(roomUsers).forEach((roomId)=>{
      roomUsers[roomId] = roomUsers[roomId].filter(user => user !== socket.username);
      io.sockets.in(roomId).emit("updateUserList",roomUsers[roomId])
    });
  });
});
