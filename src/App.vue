<template>
  <div id="app">
    <NavigationBar v-if="notLogin"/>
    <router-view></router-view>
    <Footer v-if="notLogin"/>

    <div id="notification-anchor"></div>

    <b-popover :show.sync="showPop" target="notification-anchor" triggers="manual" placement="left" container="error-popover"> 
            <template v-slot:title>Notification</template>
            <label>{{message}}</label>
      </b-popover>
  </div>
</template>

<script>
import NavigationBar from './components/NavigationBar.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'App',
  mounted(){
    
  },
  data(){
    return{
      showPop: false,
      message:''
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
  }
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
