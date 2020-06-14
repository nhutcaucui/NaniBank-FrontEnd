<template>
  <div id="app">
    <NavigationBar v-if="notLogin"/>
    <router-view></router-view>
    <Footer v-if="notLogin"/>
  </div>
</template>

<script>
import NavigationBar from './components/NavigationBar.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'App',
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
