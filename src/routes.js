import Contribute from "./components/Contribute.vue";
import FavPage from "./components/FavPage.vue";
import LandingPage from "./components/LandingPage.vue";
import Preferencing from "./components/Preferencing.vue";
import Restaurant from "./components/Restaurant.vue";
import SearchPage from "./components/SearchPage.vue";
import SignUp from "./components/SignUp.vue";
import Recipe from "./components/Recipe.vue";
import FullRecipe from "./components/FullRecipe.vue";
import ProfilePage from "./components/ProfilePage";
import Characteristic from "./components/Characteristic";
import ProfileSearch from "./components/ProfileSearch";
import DashBoard from "./components/DashBoard.vue";

import store from "./store";

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
