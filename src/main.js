import Vue from 'vue'
import App from './App.vue'
//import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'
//import Home from '@/components/Home' // this is the import line to add
import router from '@/router/index.js'

Vue.config.productionTip = false;
//Vue.use(Router);

// const routes = [
//   {
//     path: '/',
//     name: 'HelloWorld',
//     component: HelloWorld
//   },
//   {
//       path: '/Home',
//       name: 'Home',
//       component: Home
//   }
// ]

// const router = new Router({
//   routes // short for `routes: routes`
// })

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
