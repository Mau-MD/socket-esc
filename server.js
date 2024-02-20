const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

io.on("connection", (socket) => {
  console.log("A user connected");

  // Listen for a custom event named 'chat message'
  socket.on("msg-send", (message) => {
    io.emit("msg-incoming", message);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Add Socket.IO logic here
const port = 3000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
