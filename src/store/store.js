import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    host: "http://35.240.195.17/",
    userType: -1,
    accessToken:"",
    id: '',
    username: ''
  },
  mutations: {
    setUser (state, payload) {
      state.userType = payload.type;
      state.accessToken = payload.token;
      state.username = payload.username;
    },
    setId(state, payload){
      state.id = payload.id;
    },
    clearUser (state) {
      state.userType = -1;
      state.accessToken = '';
      state.username ='';
    },
  }
})