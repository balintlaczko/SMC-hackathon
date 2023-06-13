<template>
  <button @click="connectSocket" >
    Connect!
  </button>
  <button @click="sayHi" >
    Say hi!
  </button>
</template>

<script>
import io from "socket.io-client";

export default {
  name: 'MainComponent',
  data () {
    return {
      connected: false,
      socket: null
    }
  },
  methods:
  {
    connectSocket()
    {
      this.socket = io('ws://localhost:3000');
      
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
</style>
