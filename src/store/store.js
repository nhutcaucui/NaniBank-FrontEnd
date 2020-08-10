import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';
//import Cookies from 'js-cookie';

//localStorage.removeItem('vuex')

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    //host: "http://localhost:3000/",
    //host: "http://52.187.69.243/",
    host: "http://35.247.178.19:3000/",
    nguyenGetInfo: "http://7d32d69eaef0.ngrok.io/api/account/info/",
    nguyenTranfer: "http://7d32d69eaef0.ngrok.io/api/account/money/",
    lamGetInfo: "http://bank-backend.khuedoan.com/api/partner/get-account-info",
    lamTranfer: "http://bank-backend.khuedoan.com/api/partner/deposit",
    lamSecret: 'M0ec3lAqjHV82v66VYDb',
    userType: -1,
    accessToken:"",
    id: '',
    username: '',
    refreshToken:'',
    secretKey:'himom',
    socketUrl:'http://35.247.178.19:3000'
  },
  plugins: [createPersistedState({
    overwrite:true
  })],
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