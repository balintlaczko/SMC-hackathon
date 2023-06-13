const io = require("socket.io-client");
const OSC = require('osc-js')

let socket;
let url = "ws://localhost:3000";
// url = "wss://smc.fly.dev"; // for production
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

socket.on("orientation", (data) => {
    console.log("Got orientation");
    // unpack data
    const socketid = data[0];
    const orientation = data[1];
    // console.log(socketid);
    // console.log(orientation);
    const message = new OSC.Message('/tosc/orientation', socketid, orientation.alpha, orientation.beta, orientation.gamma)
    osc.send(message)
    console.log("Sent orientation");
});

socket.on("motion", (data) => {
    console.log("Got motion");
    // unpack data
    const socketid = data[0];
    const motion = data[1];
    console.log(socketid);
    console.log(motion);
    const message = new OSC.Message('/tosc/motion', socketid, motion.acceleration.x, motion.acceleration.y, motion.acceleration.z, motion.accelerationIncludingGravity.x, motion.accelerationIncludingGravity.y, motion.accelerationIncludingGravity.z, motion.rotationRate.alpha, motion.rotationRate.beta, motion.rotationRate.gamma)
    osc.send(message)
    console.log("Sent motion");
});

socket.on("sensors", (data) => {
    // console.log("Got sensors");
    // unpack data
    const socketid = data[0];
    const sensors = data[1];
    // console.log(socketid);
    // console.log(sensors);
    const orientation = sensors.orientation;
    const motion = sensors.motion;
    const acceleration = motion.acceleration;
    const accelerationIncludingGravity = motion.accelerationIncludingGravity;
    const rotationRate = motion.rotationRate;
    const idMessage = new OSC.Message('/tosc/sensors/id', socketid);
    const orientationMessage = new OSC.Message('/tosc/sensors/orientation', orientation.alpha, orientation.beta, orientation.gamma);
    const accelerationMessage = new OSC.Message('/tosc/sensors/acceleration', acceleration.x, acceleration.y, acceleration.z);
    const accelerationIncludingGravityMessage = new OSC.Message('/tosc/sensors/accelerationIncludingGravity', accelerationIncludingGravity.x, accelerationIncludingGravity.y, accelerationIncludingGravity.z);
    const rotationRateMessage = new OSC.Message('/tosc/sensors/rotationRate', rotationRate.alpha, rotationRate.beta, rotationRate.gamma);
    const bundle = new OSC.Bundle(idMessage, orientationMessage, accelerationMessage, accelerationIncludingGravityMessage, rotationRateMessage);
    bundle.pack();
    osc.send(bundle);
    // console.log("Sent sensors");
});
  
