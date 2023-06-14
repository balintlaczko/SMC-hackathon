(function(){"use strict";var e={9212:function(e,t,n){var i=n(9242),o=n(3396);function a(e,t,n,i,a,l){const r=(0,o.up)("MainComponent");return(0,o.wg)(),(0,o.j4)(r)}var l=n(7139);const r={class:"main-container"},c={key:0,class:"title"},s={key:2,class:"button-container"},d={class:"flip-container"};function u(e,t,n,i,a,u){return(0,o.wg)(),(0,o.iD)(o.HY,null,[(0,o._)("div",{id:"connection-led",style:(0,l.j5)(u.ledColor)},null,4),(0,o._)("div",r,[a.connected?(0,o.kq)("",!0):((0,o.wg)(),(0,o.iD)("div",c," Welcome! ")),a.connected?(0,o.kq)("",!0):((0,o.wg)(),(0,o.iD)("div",{key:1,class:"btn",onClick:t[0]||(t[0]=(...e)=>u.connectSocket&&u.connectSocket(...e))}," Connect ")),a.connected?((0,o.wg)(),(0,o.iD)("div",s,[(0,o._)("div",{class:"btn",onClick:t[1]||(t[1]=(...e)=>u.sayHi&&u.sayHi(...e))}," Say hi! "),(0,o._)("div",{class:(0,l.C_)(["btn",{active:a.sensorsActive}]),onClick:t[2]||(t[2]=(...e)=>u.enableSensors&&u.enableSensors(...e))}," Sensors ",2),(0,o._)("div",d,[(0,o._)("div",{class:(0,l.C_)(["btn",{active:a.azimuthFlip}]),id:"flip-azimuth",onClick:t[3]||(t[3]=(...e)=>u.flipAzimuth&&u.flipAzimuth(...e))}," Flip azimuth ",2),(0,o._)("div",{class:(0,l.C_)(["btn",{active:a.elevationFlip}]),id:"flip-elevation",onClick:t[4]||(t[4]=(...e)=>u.flipElevation&&u.flipElevation(...e))}," Flip elevation ",2),(0,o._)("div",{class:(0,l.C_)(["btn",{active:a.rollFlip}]),id:"flip-roll",onClick:t[5]||(t[5]=(...e)=>u.flipRoll&&u.flipRoll(...e))}," Flip roll ",2)]),(0,o._)("div",{class:"btn",id:"center-btn",onClick:t[6]||(t[6]=(...e)=>u.centerOrientation&&u.centerOrientation(...e))}," Center! ")])):(0,o.kq)("",!0)])],64)}var h=n(5477);let v={orientation:{alpha:0,beta:0,gamma:0},motion:{acceleration:{x:0,y:0,z:0},accelerationIncludingGravity:{x:0,y:0,z:0},rotationRate:{alpha:0,beta:0,gamma:0}}},p={alpha:0,beta:0,gamma:0},f={alpha:0,beta:0,gamma:0};var m={name:"MainComponent",data(){return{connected:!1,socket:null,address:"wss://smc.fly.dev",sensorsActive:!1,azimuthFlip:0,elevationFlip:0,rollFlip:0}},computed:{socketStatus(){return this.connected?"Connected":"Disconnected"},ledColor(){return{"background-color":this.connected?"#00ff33":"red"}}},methods:{connectSocket(){this.socket=(0,h.ZP)(this.address),this.socket.on("connected",(e=>{this.connected=e,this.connected&&console.log("Connected to server.")}))},flipAzimuth(){this.azimuthFlip=1-this.azimuthFlip},flipElevation(){this.elevationFlip=1-this.elevationFlip},flipRoll(){this.rollFlip=1-this.rollFlip},foldDegree(e){let t=e%360;return t%180+-180*Math.floor(t/180)},disconnectSocket(){this.socket.disconnect(),this.connected=!1},sayHi(){this.socket.emit("sayhi","Hi!")},enableSensors(e){e.preventDefault(),this.sensorsActive?(window.removeEventListener("deviceorientation",this.handleOrientation),window.removeEventListener("devicemotion",this.handleMotion),this.sensorsActive=!1):(window.addEventListener("deviceorientation",this.handleOrientation),window.addEventListener("devicemotion",this.handleMotion),this.sensorsActive=!0)},centerOrientation(){f=p},handleOrientation(e){const t={alpha:this.foldDegree(e.alpha*(-1*this.azimuthFlip)-f.alpha),beta:this.foldDegree(e.beta*(-1*this.elevationFlip)-f.beta),gamma:this.foldDegree(e.gamma*(-1*this.rollFlip)-f.gamma)};p={alpha:e.alpha*(-1*this.azimuthFlip),beta:e.beta*(-1*this.elevationFlip),gamma:e.gamma*(-1*this.rollFlip)},v.orientation=t},handleMotion(e){const t={acceleration:{x:e.acceleration.x,y:e.acceleration.y,z:e.acceleration.z},accelerationIncludingGravity:{x:e.accelerationIncludingGravity.x,y:e.accelerationIncludingGravity.y,z:e.accelerationIncludingGravity.z},rotationRate:{alpha:e.rotationRate.alpha,beta:e.rotationRate.beta,gamma:e.rotationRate.gamma}};v.motion=t,this.socket.emit("sensors",v)}}},b=n(89);const g=(0,b.Z)(m,[["render",u],["__scopeId","data-v-4d94deae"]]);var y=g,k={name:"App",components:{MainComponent:y}};const w=(0,b.Z)(k,[["render",a]]);var C=w;(0,i.ri)(C).mount("#app")}},t={};function n(i){var o=t[i];if(void 0!==o)return o.exports;var a=t[i]={exports:{}};return e[i].call(a.exports,a,a.exports,n),a.exports}n.m=e,function(){var e=[];n.O=function(t,i,o,a){if(!i){var l=1/0;for(d=0;d<e.length;d++){i=e[d][0],o=e[d][1],a=e[d][2];for(var r=!0,c=0;c<i.length;c++)(!1&a||l>=a)&&Object.keys(n.O).every((function(e){return n.O[e](i[c])}))?i.splice(c--,1):(r=!1,a<l&&(l=a));if(r){e.splice(d--,1);var s=o();void 0!==s&&(t=s)}}return t}a=a||0;for(var d=e.length;d>0&&e[d-1][2]>a;d--)e[d]=e[d-1];e[d]=[i,o,a]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var i in t)n.o(t,i)&&!n.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){var e={143:0};n.O.j=function(t){return 0===e[t]};var t=function(t,i){var o,a,l=i[0],r=i[1],c=i[2],s=0;if(l.some((function(t){return 0!==e[t]}))){for(o in r)n.o(r,o)&&(n.m[o]=r[o]);if(c)var d=c(n)}for(t&&t(i);s<l.length;s++)a=l[s],n.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return n.O(d)},i=self["webpackChunkclient"]=self["webpackChunkclient"]||[];i.forEach(t.bind(null,0)),i.push=t.bind(null,i.push.bind(i))}();var i=n.O(void 0,[998],(function(){return n(9212)}));i=n.O(i)})();
//# sourceMappingURL=app.a55b6225.js.map