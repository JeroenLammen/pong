var express = require("express");
var bodyParser = require('body-parser');
var mongo = require("mongodb");
var mongoose = require("mongoose");
var socketio = require("socket.io");
var http = require("http");

var app = express();
var httpServer = http.Server(app);
var io = socketio(httpServer);

app.use(express.static('../client'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//app.get('/', function(){
//   //res.sendFile();
//});

io.on("connection",function(socket){
    console.log("socket connection started");
   socket.on("newDevice",function(data){
       console.log("new Device connected");
       console.log(data);
       socket.broadcast.emit("deviceAdded", data);
   });
    socket.on("motionData", function(motionData) {
        //console.log(motionData);
        socket.broadcast.emit("movePaddle", motionData);
    });
});

//

httpServer.listen(8000, '0.0.0.0');
console.log("Server listening on port 8000");