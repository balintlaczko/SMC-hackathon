<template>
  <div id="connection-led" :style="ledColor"></div>
  <div class="main-container">
    <div class="title" v-if="!connected">
      Welcome!
    </div>
    <div class="btn" v-if="!connected" @click="connectSocket" >
        Connect
      </div>
    <div v-if="connected" class="button-container">
      <div class="btn" @click="sayHi" >
        Say hi!
      </div>
      <div class="btn" :class="{ active: sensorsActive }" @click="enableSensors" >
        Sensors
      </div>
      <div class="btn" id="center-btn" @click="centerOrientation">
        Center!
      </div>
    </div>
  </div>
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

  let orientationOffset = {
    alpha: 0,
    beta: 0,
    gamma: 0
  };

export default {
  name: 'MainComponent',
  data () {
    return {
      connected: false,
      socket: null,
      // address: "ws://localhost:3000",
      address: "ws://10.21.1.42:3000",
      // address: "wss://smc.fly.dev",
      sensorsActive: false,
    }
  },
  computed: {
    socketStatus() {
      return this.connected ? "Connected" : "Disconnected";
    },
    ledColor() {
      return {
        "background-color": this.connected ? "#00ff33" : "red"
      }
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
      if (this.sensorsActive) {
        window.removeEventListener("deviceorientation", this.handleOrientation);
        window.removeEventListener("devicemotion", this.handleMotion);
        this.sensorsActive = false;
      } else {
        window.addEventListener("deviceorientation", this.handleOrientation);
        window.addEventListener("devicemotion", this.handleMotion);
        this.sensorsActive = true;
      }
    },
    centerOrientation() {
      orientationOffset = sensorData.orientation;
    },
    handleOrientation(event) {
      const sensorOrientationData = {
        alpha: event.alpha,
        beta: event.beta,
        gamma: event.gamma
      };
      sensorData.orientation = sensorOrientationData - orientationOffset;
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
.main-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90vh;
}
#connection-led {
  position: absolute;
  right: 10px;
  top: 10px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  /* background-color: red; */
}
.title {
  font-size: 30px;
  font-weight: bold;
  padding-bottom: 200px;
}
.active {
  background-color: yellow;
}
.button-container {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
}
.btn {
  width: 100px;
  height: 40px;
  /* background-color: #00ff33; */
  border: solid;
  border-color: black;
  border-width: 2px;
  border-radius: 10px;
  margin: 10px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
