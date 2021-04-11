import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";

import routes from "./routes.js";
import RecipeForm from "./components/RecipeForm.vue";
import RestaurantForm from "./components/RestaurantForm.vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import CFooter from "./components/CustomFooter.vue";
import CustomHeader from "./components/CustomHeader.vue";

Vue.config.productionTip = false;

Vue.component("recipeform", RecipeForm);
Vue.component("restaurantform", RestaurantForm);
Vue.component("Cfooter",CFooter);
Vue.component("pulse-loader", require("vue-spinner/src/PulseLoader.vue"));
Vue.component("Cheader",CustomHeader);

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.use(VueRouter);
const myRouter = new VueRouter({
  routes: routes,
  mode: "history",
});

import Vuex from "vuex";
Vue.use(Vuex);
import store from "./store.js";

new Vue({
  render: (h) => h(App),
  router: myRouter,
  store: store,
}).$mount("#app");
