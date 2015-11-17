var express = require("express");
var bodyParser = require('body-parser');
var mongo = require("mongodb");
var mongoose = require("mongoose");
var socketio = require("socket.io");
var http = require("http");

var app = express();
var httpServer = http.Server(app);
var io = socketio(httpServer);

var usernames = [];
var index;
var ext = require('./functions/functions');

app.use(express.static('../client'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//app.get('/', function(){
//   //res.sendFile();
//});

app.all('*', function(req, res) {
    res.redirect("/");
});

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
        var thisUsername;
        console.log('user disconnected');
        index = -1;
        for(var i = 0; i < usernames.length; i++) {
            if (usernames[i].id === socket.id) {
                index = i;
                thisUsername = usernames[i].username;
                break;
            } else {
                thisUsername = '!noUser!';
            }
        }
        io.emit('disconnect', thisUsername);
        console.log(thisUsername+' has disconnected');
        usernames.splice(index, 1);
    });

    socket.on('username', function(msg){
        var socketId = ':'+socket.id;
        console.log(msg);
        console.log('length: '+usernames.length);
        if(usernames.length >= 2) {
            io.emit('error', 'Er zijn al 2 spelers in de kamer.');
        } else if(usernames.length > 0) {
            var found = usernames.some(function (el) {
                //console.log(el);
                return el.username === msg;
            });
            if (!found) {
                usernames.push({
                    username: msg,
                    id: socket.id
                });
                io.emit('username', msg)
            } else {
                io.emit('error', 'Deze username is al in gebruik.\nProbeer het nog eens.');
                console.log('Duplicate username.')
            }
        } else {
            console.log('First username');
            usernames.push({
                username: msg,
                id: socket.id
            });
            io.emit('username', msg)
        }
        console.log(usernames);

    });

    socket.on('userReady', function(msg) {
        var thisUsername;
        index = -1;
        for(var i = 0; i < usernames.length; i++) {
            if (usernames[i].id === socket.id) {
                index = i;
                thisUsername = usernames[i].username;
                break;
            }
        }
        console.log('ready: '+thisUsername);
        io.emit('userReady', thisUsername);
    });

    socket.on('start', function(msg){
        io.emit('start', msg);
    });

    socket.on('end', function(msg){
        io.emit('end', msg);
    });

    socket.on('y-coord', function(msg){

        if (msg != null) {
            //console.log(msg);
            //console.log('y: ' + msg);
            io.emit('y-coord', msg, ext.findUser(socket.id, usernames));
        }
    });

    socket.on('rotatie', function(msg) {
        if (msg != null) {
            io.emit('rotatie', msg, ext.findUser(socket.id, usernames));
        }
    });
});



//io.on("connection",function(socket){
//
//    //var playerCount, rooms, noRoom;
//    var players = [];
//    var playerCount = 0;
//
//    socket.on("disconnect", function() {
//        console.log("device disconnected");
//
//    });
//
//   socket.on("newDevice",function(data){
//       console.log(socket.id);
//       //console.log("----------------------------------");
//       //console.log("new Device connected");
//       //playerCount = io.sockets.sockets.length;
//       //console.log(playerCount);
//       //rooms = io.sockets.adapter.rooms;
//       //console.log(rooms);
//       //console.log("number of rooms: " + rooms.length);
//       //for(var i=0; i<rooms.length; i++){
//       //    console.log("for statement");
//       //    if(Object.keys(rooms["room" + i]).length == 1) {
//       //        console.log("if statement");
//       //        socket.join("room" + i);
//       //        noRoom = false;
//       //        break;
//       //    } else {
//       //        console.log("else statement");
//       //        if(i == rooms.length-1) {
//       //            noRoom = true;
//       //        }
//       //    }
//       //}
//       //if(noRoom){
//       //    console.log('no room');
//       //    socket.join("room" + Math.ceil(playerCount/2));
//       //}
//
//       //socket.join("pongRoom");
//       //var room = io.sockets.adapter.rooms['pongRoom'];
//       //console.log(Object.keys(room).length);
//
//       console.log(data);
//       socket.broadcast.emit("deviceAdded", data);
//   });
//    socket.on("motionData", function(motionData) {
//        //console.log(motionData);
//        socket.broadcast.emit("movePaddle", motionData);
//    });
//});

//

httpServer.listen(8000, '0.0.0.0');
console.log("Server listening on port 8000");