import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    authenticated: false,
    uid: null,
  },
  mutations: {
    setAuthentication(state, status) {
      state.authenticated = status;
    },
    setUid(state, uid) {
      state.uid = uid;
    },
  },
  plugins: [createPersistedState()],
});

export default store;
