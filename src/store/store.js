import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';
//import Cookies from 'js-cookie';

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    //host: "http://52.187.69.243/",
    host: "http://localhost:3000/",
    userType: -1,
    accessToken:"",
    id: '',
    username: '',
    refreshToken:''
  },
  plugins: [createPersistedState()],
  mutations: {
    setUser (state, payload) {
      state.userType = payload.type;
      state.accessToken = payload.token;
      state.username = payload.username;
    },
    setRefresh(state, payload){
      state.refreshToken = payload.refreshToken;
    },
    setToken(state, payload){
      state.accessToken = payload.token;
    },
    setId(state, payload){
      state.id = payload.id;
    },
    clearUser (state) {
      state.userType = -1;
      state.accessToken = '';
      state.username ='';
    },
  },
})

export default store;