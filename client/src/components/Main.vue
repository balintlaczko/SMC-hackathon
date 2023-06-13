<template>
  <button @click="connectSocket" >
    Connect!
  </button>
  <button @click="sayHi" >
    Say hi!
  </button>
  <button :class="{ active: is_running }" @click="enableSensors" >
    Sensors
  </button>
</template>

<script>
import io from "socket.io-client";

let sensorData = {
        orientation: {
          alpha: 0,
          beta: 0,
          gamma: 0
        },
        motion: {
          acceleration: {
            x: 0,
            y: 0,
            z: 0
          },
          accelerationIncludingGravity: {
            x: 0,
            y: 0,
            z: 0
          },
          rotationRate: {
            alpha: 0,
            beta: 0,
            gamma: 0
          }
        },
      };

export default {
  name: 'MainComponent',
  data () {
    return {
      connected: false,
      socket: null,
      // address: "ws://localhost:3000",
      // address: "ws://10.10.40.117:3000",
      address: "wss://smc.fly.dev",
      is_running: false,
    }
  },
  computed: {
    socketStatus() {
      return this.connected ? "Connected" : "Disconnected";
    }
  },
  methods:
  {
    connectSocket()
    {
      this.socket = io(this.address);
      
      this.socket.on("connected", (connected) => {
          this.connected = connected;
          if (this.connected) console.log("Connected to server.");
        });

    },
    disconnectSocket()
    {
      this.socket.disconnect();
      this.connected = false;
    },
    sayHi()
    {
      this.socket.emit("sayhi", "Hi!");
    },
    enableSensors(e) {
      e.preventDefault();
      // Request permission for iOS 13+ devices
      // if (DeviceMotionEvent && typeof DeviceMotionEvent.requestPermission === "function") {
      //   DeviceMotionEvent.requestPermission();
      // }
      if (this.is_running) {
        window.removeEventListener("deviceorientation", this.handleOrientation);
        window.removeEventListener("devicemotion", this.handleMotion);
        this.is_running = false;
      } else {
        window.addEventListener("deviceorientation", this.handleOrientation);
        window.addEventListener("devicemotion", this.handleMotion);
        this.is_running = true;
      }
    },
    handleOrientation(event) {
      const sensorOrientationData = {
        alpha: event.alpha,
        beta: event.beta,
        gamma: event.gamma
      };
      sensorData.orientation = sensorOrientationData;
      // this.socket.emit("orientation", sensorOrientationData);
    },
    handleMotion(event) {
      const sensorMotionData = {
        acceleration: {
          x: event.acceleration.x,
          y: event.acceleration.y,
          z: event.acceleration.z
        },
        accelerationIncludingGravity: {
          x: event.accelerationIncludingGravity.x,
          y: event.accelerationIncludingGravity.y,
          z: event.accelerationIncludingGravity.z
        },
        rotationRate: {
          alpha: event.rotationRate.alpha,
          beta: event.rotationRate.beta,
          gamma: event.rotationRate.gamma
        }
      };
      sensorData.motion = sensorMotionData;
      this.socket.emit("sensors", sensorData);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.active {
  background-color: yellow;
}
</style>
