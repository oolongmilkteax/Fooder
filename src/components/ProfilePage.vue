<template>
  <div class="body">
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="/searchpage">Fooder</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item href="/searchpage">Search</b-nav-item>
          <b-nav-item href="/contribute">Contribute</b-nav-item>
          <b-nav-item href="/favpage">favourites</b-nav-item>
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              User
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <ul class="ul">
      <router-link to="/contribute" class="routes">Contribute</router-link>
      <router-link to="/favpage" class="routes">favpage</router-link>
      <router-link to="/recipe" class="routes">Recipe</router-link>
      <router-link to="/preferencing" class="routes">Preferencing</router-link>
      <router-link to="/restaurant" class="routes">Restaurant</router-link>
      <router-link to="/searchpage" class="routes">Search Page</router-link>
      <router-link @click.native="logout" to="/" class="routes"
        >Logout</router-link
      >
      <router-link to="/profile" class="routes">Profile</router-link>
      <router-link to="/characteristic" class="routes"
        >Characteristic</router-link
      >
      <router-link to="/profileresults" class="routes"
        >ProfileSearch</router-link
      >
    </ul>
    <PulseLoader id="loading" :loading="isLoading"></PulseLoader>
    <div v-show="!isLoading" class="profileBorder">
      <h1 style="text-align:center" v-if="contriRecipes != ''">
        Contributed Recipes
      </h1>
      <ul id="BriefDescription">
        <li id="list" v-for="recipe in recipes" v-bind:key="recipe">
          <h2>{{ recipe.name }}</h2>
          <img v-bind:src="recipe.image" alt="Food image" />
          <br />
          <br />
          <br />
        </li>
      </ul>
      <h1 style="text-align:center" v-if="contriRestaurants != ''">
        Contributed Restaurants
      </h1>
      <ul id="BriefDescription">
        <li id="list" v-for="restaurant in restaurants" v-bind:key="restaurant">
          <h2>{{ restaurant.name }}</h2>
          <img v-bind:src="restaurant.image" alt="Restaurant image" />
          <br />
          <br />
          <br />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import db from "../firebase.js";
import logout from "./logout.js";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";

export default {
  data() {
    return {
      isLoading: true,
      contriRestaurants: [],
      contriRecipes: [],
      uid: "",
      restaurants: [],
      recipes: [],
    };
  },
  components: {
    PulseLoader,
  },
  methods: {
    logout: logout,
    fetchInfo: function() {
      this.uid = this.$store.state.uid;
      db.firestore()
        .collection("user")
        .doc(this.uid)
        .get()
        .then((user) => {
          this.contriRecipes = user.data().contributeRecipe;
          this.contriRestaurants = user.data().contributeRestaurant;
          this.fetchRecipes();
          this.fetchRestaurants(this.uid);
        })
        .then(() => {
          this.isLoading = false;
        });
    },
    fetchRecipes: function() {
      db.firestore()
        .collection("recipe")
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            if (this.contriRecipes.includes(doc.id)) {
              this.recipes.push(doc.data());
            }
          });
        });
    },
    fetchRestaurants: function() {
      db.firestore()
        .collection("restaurant")
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            if (this.contriRestaurants.includes(doc.id)) {
              this.restaurants.push(doc.data());
            }
          });
        });
    },
  },
  created: function() {
    this.fetchInfo();
  },
};
</script>

<style>
.profileBorder {
  width: 100%;
  padding-right: 20px;
}

#list {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 5px;
  border: 1px solid #222;
  margin: 10px;
  list-style-type: none;
}

#BriefDescription {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  line-height: 5px;
}

img {
  width: 370px;
  height: 370px;
}

#loading {
  min-height: 30em;
  align-items: center;
  display: flex;
  justify-content: center;
}
</style>
