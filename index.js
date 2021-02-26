var express = require('express');
var app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = 80;


app.use('/', express.static('client/build'));

var connections = {}

io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on("disconnect", () => {
        console.log("user disconnected");
        if (connections[socket.id] != undefined) {
            io.emit("user quit", connections[socket.id]);
            connections[socket.id] = undefined;
        }
    });
    
    /* Handles new users "login" */
    socket.on("new user", (username) => {
        /* Checks if the username is already taken */
        let found = false;
        for (var socket_id in connections) {
            if (connections[socket_id] === username) {
                found = true;
                break;
            }
        }
        
        if (!found) {
            connections[socket.id] = username;
            socket.emit("new user", true);
            io.emit("user join", username);
        }
        else {
            socket.emit("new user", false);
        }
    });

    /* Handles new messages */
    socket.on("new message", (message) => {
        /* Broadcasts to everyone */
        io.emit("new message", message);
    });
});

http.listen(PORT, function () {
    console.log(`http://localhost:${PORT}`);
});
