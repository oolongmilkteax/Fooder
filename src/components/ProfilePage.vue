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
            <b-dropdown-item href="/profile">Profile</b-dropdown-item>
            <b-dropdown-item href="/dashboard">Dashboard</b-dropdown-item>
            <b-dropdown-item v-on:click="logout()">Sign Out</b-dropdown-item>
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
      <b-card :title="name" bg-variant="secondary" text-variant="white" class="mb-4 ">
        <b-card-text>
          {{ email }}
        </b-card-text>
      </b-card>
      <br>

      <div id="emptyContri" v-if="contriRecipes == '' && contriRestaurants == ''">
        <span>You have made 0 contributions so far</span>
        <br>
        <button 
          id="contributeButton"
          v-on:click="contribute"
        >Start contributing!
        </button>
      </div>

      <h1 style="text-align:center" v-if="contriRecipes != ''">
        Contributed Recipes
      </h1>
      <ul id="BriefDescription">
        <b-card-group deck class="mx-auto">
          <li
          id="profilelist"
          class="ml-3 mx-auto"
          v-for="recipe in recipes"
          v-bind:key="recipe.name"
          >  
          <b-card :title="recipe.name" v-bind:img-src="recipe.image" v-on:click="go(recipe.ingredients, recipe.directions);" class="mb-4 mx-auto" style="width: 23rem;">
            <b-card-text>
              
            </b-card-text>

          </b-card>
          </li>
        </b-card-group>
        
      </ul>
      <br>
      <br>
      <h1 style="text-align:center" v-if="contriRestaurants != ''">
        Contributed Restaurants
      </h1>
      <ul id="BriefDescription">
        <b-card-group deck class="mx-auto">
          <li
          id="profilelist"
          class="ml-3 mx-auto"
          v-for="restaurant in restaurants"
          v-bind:key="restaurant.name"
          >  
          <b-card :title="restaurant.name" v-bind:img-src="restaurant.image" v-on:click="open(restaurant.websiteLink);" class="mb-4 mx-auto" style="width: 23rem;">
            <b-card-text>
              
            </b-card-text>

          </b-card>
          </li>
        </b-card-group>
        
      </ul>
    </div>
  </div>
</template>

<script>
import db from "../firebase.js";
import logout from "./logout.js";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";

export default {
  props: ["userProfile"],
  data() {
    return {
      isLoading: true,
      contriRestaurants: [],
      contriRecipes: [],
      uid: "",
      restaurants: [],
      recipes: [],
      name:"",
      username:"",
      email:"",
    };
  },
  components: {
    PulseLoader,
  },
  methods: {
    logout: logout,
    fetchInfo: function() {
      //this.uid = db.auth().currentUser.uid;
      this.uid = this.$store.state.uid;
      if(this.userProfile == null){
        db.firestore()
          .collection("user")
          .doc(this.uid)
          .get()
          .then((user) => {
              this.name = user.data().name;
              this.email = user.data().email;
              this.contriRecipes = user.data().contributeRecipe;
              this.contriRestaurants = user.data().contributeRestaurant;
              this.fetchRecipes();
              this.fetchRestaurants(this.uid);
          })
          .then(() => {
            this.isLoading = false;
          });
      } else {
        db.firestore()
        .collection("user")
        .doc(this.userProfile[0])
        .get()
        .then((user) => {
            this.name = user.data().name;
            this.username = user.data().username;
            this.email = user.data().email;
            this.contriRecipes = user.data().contributeRecipe;
            this.contriRestaurants = user.data().contributeRestaurant;
            this.fetchRecipes();
            this.fetchRestaurants(this.uid);
        })
        .then(() => {
          this.isLoading = false;
        });
      }
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
    searchRecipe: function(recipe){
      this.$router.push({ name: 'Recipe', params: {searchedValue: recipe}})
    },
    searchRestaurant: function(restaurant){
      this.$router.push({ name: 'Restaurant', params: {searchedValue: restaurant}})
    },
    go: function(ingredients, directions) {
      this.$router.push({
        name: "FullRecipe",
        params: { i: ingredients, d: directions }
      });
    },
    open: function(url) {
      window.open(url);
    },
    contribute: function() {
      this.$router.push({ path: "/contribute" })
    }
  },
  created: function() {
    this.fetchInfo();
  },
};
</script>

<style scoped>
img {
  width: 100%;
  height: 15rem;
  object-fit: cover;
}
#emptyContri {
  line-height: 50px;
}

#contributeButton {
  background: #0088cc;
  width: 350px;
  border-radius: 8px;
  color: #ffffff;
  font-family: Helvetica;
  font-weight: 100;
  padding: 14px;
  border: solid #0088cc 1px;
  font-size: 28px;
  font-weight: 100;
}

#contributeButton:hover {
  border: solid #979797 1px;
  background: #979797;
  -webkit-border-radius: 20px;
  -moz-border-radius: 14px;
  border-radius: 8px;
  text-decoration: none;
}

.profileBorder {
  width: 100%;
  text-align: center;
}

#loading {
  min-height: 30em;
  align-items: center;
  display: flex;
  justify-content: center;
}
</style>
