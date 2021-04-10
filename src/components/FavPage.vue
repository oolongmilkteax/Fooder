<template>
  <div class="body">
    <Cheader></Cheader>
    <PulseLoader id="loading" :loading="isLoading"></PulseLoader>
    <div v-show="!isLoading" class="profileBorder">
      <h1 style="text-align:center" v-if="favRecipe != ''">Favourite Recipes</h1>
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
          <br />
      </ul>
      <h1 style="text-align:center" v-if="favRestaurant != ''">Favourite Restaurants</h1>
      <ul id="BriefDescription">
        <b-card-group deck class="mx-auto">
          <li
          id="profilelist"
          class="col-md-6"
          v-for="restaurant in restaurants"
          v-bind:key="restaurant.name"
          >  
          <b-card :title="restaurant.name" v-bind:img-src="restaurant.image" v-on:click="searchRestaurant(restaurant.name)" class="mb-4 mx-auto" style="width: 32rem;">
            <b-card-text>
              
            </b-card-text>

          </b-card>
          </li>
        </b-card-group>
      </ul>
    </div>
    <Cfooter></Cfooter>
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
      favRecipe: "",
      favRestaurant: "",
      uid: "",
      restaurants: [],
      recipes: []
    };
  },
  components: {
    PulseLoader
  },
  methods: {
    logout: logout,
    fetchInfo: function() {
      this.uid = this.$store.state.uid;
      db.firestore()
        .collection("user")
        .doc(this.uid)
        .get({ source: "cache" })
        .then(user => {
          /*
          var source = user.metadata.fromCache ? "local cache" : "server";
          console.log("Data user came from " + source);
          */
          this.favRestaurant = user.data().favRestaurant;
          this.favRecipe = user.data().favRecipe;
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
        .get({ source: "cache" })
        .then(querySnapshot => {
          querySnapshot.docs.forEach(doc => {
            if (this.favRecipe.includes(doc.id)) {
              this.recipes.push(doc.data());
            }
          });
          /*
          var source = querySnapshot.metadata.fromCache
            ? "local cache"
            : "server";
          console.log("Data recipe came from " + source);
          */
        });
    },

    fetchRestaurants: function() {
      db.firestore()
        .collection("restaurant")
        .get({ source: "cache" })
        .then(snapshot => {
          snapshot.docs.forEach(doc => {
            if (this.favRestaurant.includes(doc.id)) {
              this.restaurants.push(doc.data());
            }
          });
          /*
          var source = snapshot.metadata.fromCache ? "local cache" : "server";
          console.log("Data retaurant came from " + source);
          */
        });
    },

    searchRecipe: function(recipe) {
      this.$router.push({ name: "Recipe", params: { searchedValue: recipe } });
    },
    searchRestaurant: function(restaurant) {
      this.$router.push({
        name: "Restaurant",
        params: { searchedValue: restaurant }
      });
    },
    go: function(ingredients, directions) {
      this.$router.push({
        name: "FullRecipe",
        params: { i: ingredients, d: directions }
      });
    },
  },
  created: function() {
    this.fetchInfo();
  }
};
</script>

<style>
.favDiv {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo {
  color: gray;
  font-size: 50px;
  font-family: -apple-system;
  margin: auto;
}

.resultsHeader {
  text-align: center;
  color: black;
  font-size: 32px;
  font-family: Helvetica;
  padding-top: 20px;

  margin-bottom: 0px;
}

.resultsList {
  color: black;
  width: 70%;
  margin: 0px;
  padding: 0 5px;
  box-sizing: border-box;
  list-style-type: none;
  cursor: pointer;
}

.resultsItem {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
  position: relative;
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

#loading {
  min-height: 30em;
  align-items: center;
  display: flex;
  justify-content: center;
}
</style>
