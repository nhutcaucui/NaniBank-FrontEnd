import Vue from 'vue'
import App from './App.vue'
//import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'
//import Home from '@/components/Home' // this is the import line to add
import router from '@/router/index.js'
import VueSidebarMenu from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
import './plugins/bootstrap'

import store from './store/store';
import axios from 'axios';
import moment from 'moment';

axios.defaults.headers.common['Accept-Version']= '1';
axios.defaults.headers.common['Accept']= 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin']= '*';
axios.defaults.headers.common['Content-Type']= 'application/json; charset=utf-8';
axios.interceptors.request.use(request => {
  console.log('Starting Request', request)
  return request
})
axios.interceptors.response.use(response => {
  console.log('Starting Response', response)
  if(response.data.Message  === "jwt expired"){
    let data ={
      access_token: store.state.accessToken,
      refresh_token: store.state.refreshToken
    }
    let config ={
      headers:{
        timestamp: moment().format("X"),
      }
    }
    axios.post(store.state.host+"users/customer/refresh", data, config).then(response1 =>{
      console.log(response1)
      if(response1.data.Status){
        store.commit('setToken', {
          token: response1.data.AccessToken
        });
        response.config.headers['access-token'] = response1.data.AccessToken;
        return axios.request(response.config);
    }
    })
  }
  return response
})

Vue.use(VueSidebarMenu)

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
