(function(){"use strict";var n={9769:function(n,e,t){var o=t(9242),i=t(3396);function a(n,e,t,o,a,r){const c=(0,i.up)("MainComponent");return(0,i.wg)(),(0,i.j4)(c)}var r=t(7139);const c={class:"main-container"},s={key:0,class:"title"},l={key:2,class:"button-container"};function d(n,e,t,o,a,d){return(0,i.wg)(),(0,i.iD)(i.HY,null,[(0,i._)("div",{id:"connection-led",style:(0,r.j5)(d.ledColor)},null,4),(0,i._)("div",c,[a.connected?(0,i.kq)("",!0):((0,i.wg)(),(0,i.iD)("div",s," Welcome! ")),a.connected?(0,i.kq)("",!0):((0,i.wg)(),(0,i.iD)("div",{key:1,class:"btn",onClick:e[0]||(e[0]=(...n)=>d.connectSocket&&d.connectSocket(...n))}," Connect ")),a.connected?((0,i.wg)(),(0,i.iD)("div",l,[(0,i._)("div",{class:"btn",onClick:e[1]||(e[1]=(...n)=>d.sayHi&&d.sayHi(...n))}," Say hi! "),(0,i._)("div",{class:(0,r.C_)(["btn",{active:a.sensorsActive}]),onClick:e[2]||(e[2]=(...n)=>d.enableSensors&&d.enableSensors(...n))}," Sensors ",2),(0,i._)("div",{class:"btn",id:"center-btn",onClick:e[3]||(e[3]=(...n)=>d.centerOrientation&&d.centerOrientation(...n))}," Center! ")])):(0,i.kq)("",!0)])],64)}var u=t(5477);let v={orientation:{alpha:0,beta:0,gamma:0},motion:{acceleration:{x:0,y:0,z:0},accelerationIncludingGravity:{x:0,y:0,z:0},rotationRate:{alpha:0,beta:0,gamma:0}}},f={alpha:0,beta:0,gamma:0};var h={name:"MainComponent",data(){return{connected:!1,socket:null,address:"wss://smc.fly.dev",sensorsActive:!1}},computed:{socketStatus(){return this.connected?"Connected":"Disconnected"},ledColor(){return{"background-color":this.connected?"#00ff33":"red"}}},methods:{connectSocket(){this.socket=(0,u.ZP)(this.address),this.socket.on("connected",(n=>{this.connected=n,this.connected&&console.log("Connected to server.")}))},disconnectSocket(){this.socket.disconnect(),this.connected=!1},sayHi(){this.socket.emit("sayhi","Hi!")},enableSensors(n){n.preventDefault(),this.sensorsActive?(window.removeEventListener("deviceorientation",this.handleOrientation),window.removeEventListener("devicemotion",this.handleMotion),this.sensorsActive=!1):(window.addEventListener("deviceorientation",this.handleOrientation),window.addEventListener("devicemotion",this.handleMotion),this.sensorsActive=!0)},centerOrientation(){f-=v.orientation},handleOrientation(n){const e={alpha:n.alpha-f.alpha,beta:n.beta-f.beta,gamma:n.gamma-f.gamma};v.orientation=e},handleMotion(n){const e={acceleration:{x:n.acceleration.x,y:n.acceleration.y,z:n.acceleration.z},accelerationIncludingGravity:{x:n.accelerationIncludingGravity.x,y:n.accelerationIncludingGravity.y,z:n.accelerationIncludingGravity.z},rotationRate:{alpha:n.rotationRate.alpha,beta:n.rotationRate.beta,gamma:n.rotationRate.gamma}};v.motion=e,this.socket.emit("sensors",v)}}},m=t(89);const p=(0,m.Z)(h,[["render",d],["__scopeId","data-v-60718746"]]);var b=p,y={name:"App",components:{MainComponent:b}};const g=(0,m.Z)(y,[["render",a]]);var k=g;(0,o.ri)(k).mount("#app")}},e={};function t(o){var i=e[o];if(void 0!==i)return i.exports;var a=e[o]={exports:{}};return n[o].call(a.exports,a,a.exports,t),a.exports}t.m=n,function(){var n=[];t.O=function(e,o,i,a){if(!o){var r=1/0;for(d=0;d<n.length;d++){o=n[d][0],i=n[d][1],a=n[d][2];for(var c=!0,s=0;s<o.length;s++)(!1&a||r>=a)&&Object.keys(t.O).every((function(n){return t.O[n](o[s])}))?o.splice(s--,1):(c=!1,a<r&&(r=a));if(c){n.splice(d--,1);var l=i();void 0!==l&&(e=l)}}return e}a=a||0;for(var d=n.length;d>0&&n[d-1][2]>a;d--)n[d]=n[d-1];n[d]=[o,i,a]}}(),function(){t.n=function(n){var e=n&&n.__esModule?function(){return n["default"]}:function(){return n};return t.d(e,{a:e}),e}}(),function(){t.d=function(n,e){for(var o in e)t.o(e,o)&&!t.o(n,o)&&Object.defineProperty(n,o,{enumerable:!0,get:e[o]})}}(),function(){t.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(n){if("object"===typeof window)return window}}()}(),function(){t.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)}}(),function(){t.r=function(n){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})}}(),function(){var n={143:0};t.O.j=function(e){return 0===n[e]};var e=function(e,o){var i,a,r=o[0],c=o[1],s=o[2],l=0;if(r.some((function(e){return 0!==n[e]}))){for(i in c)t.o(c,i)&&(t.m[i]=c[i]);if(s)var d=s(t)}for(e&&e(o);l<r.length;l++)a=r[l],t.o(n,a)&&n[a]&&n[a][0](),n[a]=0;return t.O(d)},o=self["webpackChunkclient"]=self["webpackChunkclient"]||[];o.forEach(e.bind(null,0)),o.push=e.bind(null,o.push.bind(o))}();var o=t.O(void 0,[998],(function(){return t(9769)}));o=t.O(o)})();
//# sourceMappingURL=app.60bd9c89.js.map