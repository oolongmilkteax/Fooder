import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router' 
import routes from './routes.js'
import RecipeForm from './components/RecipeForm.vue'
import RestaurantForm from './components/RestaurantForm.vue'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.component('recipeform', RecipeForm)
Vue.component('restaurantform', RestaurantForm)

const myRouter = new VueRouter({
  routes: routes,
  mode: 'history'
})

new Vue({
  render: h => h(App),
  router: myRouter
}).$mount('#app')