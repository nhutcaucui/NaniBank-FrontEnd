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
// import Vue from 'vue'
// import VueSocketIO from 'vue-socket.io'
// import SocketIO from 'socket.io-client'

export default {
  name: 'App',
  mounted(){
    this.connectSocket();
  },
  data(){
    return{
      showPop: false,
      message:'',
      title:'',
      numOfNotif:0
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
    async connectSocket(){
      var self = this;
      if(this.$store.state.userType == 1){
        console.log("connect to socket")

        this.sockets.subscribe('connect', () => {
                            console.log("connect")
                        });

                        this.sockets.subscribe('notification', (data) => {
                            console.log('message receive' + data)
                            var self = this;
                            if(this.showPop){
                            
                            setTimeout(function(){ 
                              this.title = "Thông báo"
                            this.message = data;
                            this.showPopover();
                            }, 5050*self.numOfNotif);
                            self.numOfNotif++;
                            }else{
                            self.numOfNotif++;
                            this.title = "Thông báo"
                            this.message = data;
                            this.showPopover();
                            }
                        });

                        this.sockets.subscribe('connection-update', (data) => {
                            console.log('connect success' + data)
                        });

                        this.sockets.subscribe('disconnect', () => {
                            console.log('disconnection')
                        });

        self.emitConnectionUpdate(self.$store.state.id)
      }
    },
    emitConnectionUpdate(username){
     // var self = this;
     console.log(username);
     console.log("connect update")
      this.$socket.emit("connection-update", username);
    },
    emitClientNotification(message, username){
      //var self = this;
      console.log("emit notifi")
      this.$socket.emit('client-notification', username, message );
    },
    emitDisconnect(){
      //var self = this;
      console.log("disconnect emit")
      this.sockets.unsubscribe('connect');
      this.sockets.unsubscribe('client-notification');
      this.sockets.unsubscribe('connection-update');
      this.sockets.unsubscribe('disconnect');
      this.$socket.emit("disconnect");
    },
    hidePopover(){
      this.showPop = false;
      self.numOfNotif--;
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
        'client-notification': function (data) {
            console.log('message receive' + data)
            var self = this;
            if(this.showPop){
              
              setTimeout(function(){ 
                this.title= data.type;
              this.message = data.message;
              this.showPopover();
               }, 5050*self.numOfNotif);
               self.numOfNotif++;
            }else{
              self.numOfNotif++;
              this.title= data.type;
              this.message = data.message;
              this.showPopover();
            }
        },
        'connection-update': function (data){
           console.log('connect success' + data)
        },
    disconnect:function() {
      console.log("server disconnected");
    },
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
