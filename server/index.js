const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIO = require("socket.io");

const PORT = process.env.PORT || 3000;

const app = express();

// Middleware
app.use(cors());

// Handle production
if (process.env.NODE_ENV === "production") {
  // Static folder
  app.use(express.static(__dirname + "/public/"));

  // Handle SPA
  app.use((req, res) => res.sendFile(__dirname + "public/index.html"));
}

const server = http.createServer(app);
server.listen(PORT);
const io = socketIO(server, {
  cors: {
    origin: "*",
  },
});
console.log("socket.io server created");

let scSocket;

io.on("connection", (socket) => {
    console.log("Client connected with id: " + socket.id);
    socket.emit("connected", true);

    socket.on("iamsc", () => {
        console.log("Client is SC.");
        scSocket = socket;
        socket.emit("serverpost", "Hello, SC!");
    });

    socket.on("sayhi", () => {
        console.log("Client said hi.");
        scSocket.emit("serverpost", "Hi!");
    });
  
    socket.on("disconnect", () => {
        console.log("Client disconnected.");
    });
  
    socket.on("message", (message) => {
      console.log(message);
    });
});