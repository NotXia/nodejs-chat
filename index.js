var express = require("express");
var app = express();
const path = require("path");
const http = require("http").Server(app);
const io = require("socket.io")(http);
const PORT = 80;

require("./db/create");
const db_insert = require("./db/insert");

app.use("/", express.static(path.join(__dirname, "client/build")));

require('./api/api')(app);


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
        const exists = (toFindUsername) => {
            for (var socket_id in connections) {
                if (connections[socket_id] === toFindUsername) {
                    return true;
                }
            }
            return false;
        }
        
        if (!exists(username)) {
            connections[socket.id] = username; // Links the socket to the username
            socket.emit("new user", true);     // Replies to the new client (username available)
            io.emit("user join", username);    // Broadcasts the new user"s name
            db_insert.user(username);
        }
        else {
            socket.emit("new user", false); // Replies to the new client (username not available)
        }
    });

    /* Handles new messages */
    socket.on("new message", (messageDescription) => {
        if (messageDescription.type === "message" && messageDescription.user === connections[socket.id]) { // Validates the message
            io.emit("new message", messageDescription); // Broadcasts the message
            db_insert.message(messageDescription);
        }
    });
});

http.listen(PORT, function () {
    console.log(`http://localhost:${PORT}`);
});
