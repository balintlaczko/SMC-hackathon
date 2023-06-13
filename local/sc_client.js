const io = require("socket.io-client");
const OSC = require('osc-js')

let socket;
let url = "ws://localhost:3000";
const osc = new OSC({
    plugin: new OSC.DatagramPlugin({ send: { port: 12345, host: 'localhost' } })
  });
osc.open()
console.log("OSC server created");
const message = new OSC.Message('/tosc', "init");
osc.send(message);

// connect to server
console.log("Connecting to server...");
socket = io(url);
socket.on("connected", (connected) => {
    if (connected) {
        console.log("Connected to server.");
        socket.emit("iamsc");
    }
});

socket.on("serverpost", (post) => {
    console.log("Server: " + post);
    const message = new OSC.Message('/tosc', "Server: " + post)
    osc.send(message)
    console.log("OSC message sent");
});
  
