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
const numClients = 30;
let synthSlots = Array(numClients).fill(0);
let synthSlots2clientSockets = {};
let clientSockets2synthSlots = {};


io.on("connection", (socket) => {
    console.log("Client connected with id: " + socket.id);
    socket.emit("connected", true);

    socket.on("iamsc", () => {
        console.log("Client is SC.");
        scSocket = socket;
        socket.emit("serverpost", "Hello, SC!");
    });

    socket.on("iamclient", () => {
        console.log("Client is a phone.");
        // find the first available synth slot
        let synthSlot = synthSlots.findIndex((slot) => slot === 0);
        if (synthSlot === -1) {
          console.log("No synth slots available.");
          socket.emit("serverpost", "No synth slots available.");
        } else {
          synthSlots[synthSlot] = 1;
          clientSockets2synthSlots[socket.id] = synthSlot;
          synthSlots2clientSockets[synthSlot] = socket.id;
          console.log("Client assigned synth slot: " + synthSlot);
          socket.emit("serverpost", "Assigned synth slot: " + synthSlot);
        }
    });

    socket.on("sayhi", () => {
        console.log("Client said hi.");
        scSocket.emit("serverpost", "Hi!");
    });
  
    socket.on("disconnect", () => {
      if (clientSockets2synthSlots[socket.id]) {
        console.log("Client " + socket.id + " with synthSlot " + clientSockets2synthSlots[socket.id] + " disconnected.");
        synthSlots[clientSockets2synthSlots[socket.id]] = 0;
        delete synthSlots2clientSockets[clientSockets2synthSlots[socket.id]];
        delete clientSockets2synthSlots[socket.id];
      } else {
        console.log("Client " + socket.id + " disconnected.");
      }
    });
  
    socket.on("message", (message) => {
      console.log(message);
    });

    socket.on("orientation", (orientation) => {
        console.log("Got orientation");
        scSocket.emit("orientation", [socket.id, orientation]);
    });

    socket.on("motion", (motion) => {
        console.log("Got motion");
        scSocket.emit("motion", [socket.id, motion]);
    });

    socket.on("sensors", (sensors) => {
        console.log("Got sensors");
        // scSocket.emit("sensors", [socket.id, sensors]);
        scSocket.emit("sensors", [clientSockets2synthSlots[socket.id], sensors]);
    });
});