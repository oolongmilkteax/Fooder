import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    authenticated: false,
    uid: null,
    firstLogin: true,
  },
  mutations: {
    setAuthentication(state, status) {
      state.authenticated = status;
    },
    setUid(state, uid) {
      state.uid = uid;
    },
    setFirstLogin(state, uid) {
      state.firstLogin = uid;
    },
  },
  plugins: [createPersistedState()],
});

export default store;
