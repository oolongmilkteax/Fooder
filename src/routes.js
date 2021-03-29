import Contribute from './components/Contribute.vue'
import FavPage from './components/FavPage.vue'
import Ingredients from './components/Ingredients.vue'
import LandingPage from "./components/LandingPage.vue"
import Preferencing from "./components/Preferencing.vue"
import Restaurant from "./components/Restaurant.vue"
import SearchPage from "./components/SearchPage.vue"
import SignUp from "./components/SignUp.vue"
import Recipe from "./components/Recipe.vue"
import FullRecipe from "./components/FullRecipe.vue"
import ProfilePage from "./components/ProfilePage"
import ProfileSearchPage from "./components/ProfileSearchPage"

export default [
  { name: "Contribute", path: '/contribute', component: Contribute },
  { name: "FavPage", path: '/favpage', component: FavPage },
  { name: "Ingredients", path: '/ingredients', component: Ingredients},
  { name: "LandingPage", path: '/', component: LandingPage},
  { name: "Preferencing", path: '/preferencing', component: Preferencing},
  { name: "Restaurant", path: '/restaurant', component: Restaurant},
  { name: "SearchPage", path: '/searchpage', component: SearchPage},
  { name: "SignUp", path:'/signup', component: SignUp},
  { name: "Recipe", path:'/recipe', component: Recipe, props: true},
  { name: "FullRecipe", path:'/fullrecipe', component: FullRecipe},
  { name: "ProfilePage", path:'/profile', component: ProfilePage},
  { name: "ProfileSearchPage", path:'/profilesearch', component: ProfileSearchPage},
]