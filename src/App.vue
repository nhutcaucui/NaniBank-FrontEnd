<template>
  <div id="app">
    <NavigationBar/>
    <router-view></router-view>
    <Footer/>
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
margin:0;
padding:0;
width: 100%;
height: 100%;
}
</style>
