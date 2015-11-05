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

app.all('*', function(req, res) {
    res.redirect("/");
});

var lala = require("./test");
lala.testFunction();

io.on("connection",function(socket){

    //var playerCount, rooms, noRoom;
    var players = [];
    var playerCount = 0;

    socket.on("disconnect", function() {
        console.log("device disconnected");

    });

   socket.on("newDevice",function(data){
       console.log(socket.id);
       //console.log("----------------------------------");
       //console.log("new Device connected");
       //playerCount = io.sockets.sockets.length;
       //console.log(playerCount);
       //rooms = io.sockets.adapter.rooms;
       //console.log(rooms);
       //console.log("number of rooms: " + rooms.length);
       //for(var i=0; i<rooms.length; i++){
       //    console.log("for statement");
       //    if(Object.keys(rooms["room" + i]).length == 1) {
       //        console.log("if statement");
       //        socket.join("room" + i);
       //        noRoom = false;
       //        break;
       //    } else {
       //        console.log("else statement");
       //        if(i == rooms.length-1) {
       //            noRoom = true;
       //        }
       //    }
       //}
       //if(noRoom){
       //    console.log('no room');
       //    socket.join("room" + Math.ceil(playerCount/2));
       //}

       //socket.join("pongRoom");
       //var room = io.sockets.adapter.rooms['pongRoom'];
       //console.log(Object.keys(room).length);

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