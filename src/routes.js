import Contribute from "./components/Contribute/Contribute.vue";
import FavPage from "./components/Profile/FavPage.vue";
import LandingPage from "./components/Authentication/LandingPage.vue";
import Preferencing from "./components/Preferencing/Preferencing.vue";
import Restaurant from "./components/Restaurant/Restaurant.vue";
import SearchPage from "./components/SearchPage.vue";
import SignUp from "./components/Authentication/SignUp.vue";
import Recipe from "./components/Recipe/Recipe.vue";
import FullRecipe from "./components/Recipe/FullRecipe.vue";
import ProfilePage from "./components/Profile/ProfilePage";
import Characteristic from "./components/Preferencing/Characteristic";
import ProfileSearch from "./components/Profile/ProfileSearch";
import DashBoard from "./components/Dashboard/DashBoard.vue";
import store from "./components/Authentication/store";

const beforeEnter = function(to, from, next) {
  if (store.state.authenticated == false) {
    next("/");
  } else if (store.state.donePreferencing == false) {
    next({ name: "Preferencing" });
  } else {
    next();
  }
};

const beforeEnter_pref = function(to, from, next) {
  if (store.state.authenticated == false) {
    next("/");
  } else if (store.state.donePreferencing == true) {
    next({ name: "SearchPage" });
  } else {
    next();
  }
};

const beforeEnter_char = function(to, from, next) {
  if (store.state.authenticated == false) {
    next("/");
  } else if (store.state.donePreferencing == false) {
    next({ name: "Preferencing" });
  } else if (store.state.firstLogin == false) {
    next({ name: "SearchPage" });
  } else {
    next();
  }
};

export default [
  {
    name: "DashBoard",
    path: "/dashboard",
    component: DashBoard,
    beforeEnter: beforeEnter,
  },
  {
    name: "Contribute",
    path: "/contribute",
    component: Contribute,
    beforeEnter: beforeEnter,
  },
  {
    name: "FavPage",
    path: "/favpage",
    component: FavPage,
    beforeEnter: beforeEnter,
  },
  {
    name: "LandingPage",
    path: "/",
    component: LandingPage,
  },
  {
    name: "Preferencing",
    path: "/preferencing",
    component: Preferencing,
    beforeEnter: beforeEnter_pref,
  },
  {
    name: "Restaurant",
    path: "/restaurant",
    component: Restaurant,
    props: true,
    beforeEnter: beforeEnter,
  },
  {
    name: "SearchPage",
    path: "/searchpage",
    component: SearchPage,
    beforeEnter: beforeEnter,
  },
  {
    name: "SignUp",
    path: "/signup",
    component: SignUp,
  },
  {
    name: "Recipe",
    path: "/recipe",
    component: Recipe,
    props: true,
    beforeEnter: beforeEnter,
  },
  {
    name: "FullRecipe",
    path: "/fullrecipe",
    component: FullRecipe,
    props: true,
    beforeEnter: beforeEnter,
  },
  {
    name: "ProfilePage",
    path: "/profile",
    component: ProfilePage,
    props: true,
    beforeEnter: beforeEnter,
  },
  {
    name: "Characteristic",
    path: "/characteristic",
    component: Characteristic,
    props: true,
    beforeEnter: beforeEnter_char,
  },
  {
    name: "ProfileSearch",
    path: "/profileresults",
    component: ProfileSearch,
    props: true,
    beforeEnter: beforeEnter,
  },
];
