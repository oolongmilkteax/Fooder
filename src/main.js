import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router' 
import ContributeRestaurant from './components/ContributeRestaurant.vue'
import routes from './routes.js'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.component('contribRest',ContributeRestaurant)

const myRouter = new VueRouter({
  routes: routes,
  mode: 'history'
})

new Vue({
  render: h => h(App),
  router: myRouter
}).$mount('#app')