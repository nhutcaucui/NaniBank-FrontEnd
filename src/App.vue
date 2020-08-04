<template>
  <div id="app">
    <NavigationBar v-if="notLogin"/>
    <router-view></router-view>
    <Footer v-if="notLogin"/>

    <div id="notification-anchor"></div>

    <b-popover :show.sync="showPop" target="notification-anchor" triggers="manual" placement="left" container="error-popover"> 
            <template v-slot:title>{{title}}</template>
            <label>{{message}}</label>
      </b-popover>
  </div>
</template>

<script>
import NavigationBar from './components/NavigationBar.vue';
import Footer from './components/Footer.vue';
import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'

export default {
  name: 'App',
  mounted(){
    this.connectSocket();
  },
  data(){
    return{
      showPop: false,
      message:'',
      title:''
    }
  },
  components: {
    NavigationBar,
    Footer
  },
  computed:{
      notLogin(){
          return this.$route.path == '/' || this.$route.path == '/About'
      }
  },
  methods:{
    connectSocket(){
      var self = this;
      if(this.$store.state.userType == 1){
        console.log("connect to socket")
        Vue.use(new VueSocketIO({
          debug: true,
          connection: SocketIO('url'),
          vuex: {
          store: self.$store,
          actionPrefix: 'SOCKET_',
          mutationPrefix: 'SOCKET_'
          },
        }))
      }
    },
    hidePopover(){
      this.showPop = false;
    },
    showPopover(){
      this.showPop = true;
      var self = this
      setTimeout(() => self.hidePopover(), 5000);
    },
  },
  sockets: {
        connect: function () {
            console.log('socket connected')
        },
        onMessageReceived: function (data) {
            console.log('message receive' + data)
            this.title= data.type;
            this.message = data.message;
            this.showPopover();
        }
    },
}
</script>

<style>
#notification-anchor{
  position: fixed;
  right: 0;
  top: 50px;
  width: 5px;
  height: 50px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%;
}

html, body {
  height: 100%;
margin:0;
padding:0;

}

.invisible-input{
  display: none;
}
.mx-input-wrapper i{
  display: none;
}
ul {
    list-style-type: none;
}
</style>
