import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    host: "http://35.240.195.17/",
    userType: -1,
    accessToken:""
  },
  mutations: {
    setUser (state, payload) {
      state.userType = payload.type;
      state.accessToken = payload.token;
    },
    clearUser (state) {
      state.userType = -1;
      state.accessToken = "";
    },
  }
})