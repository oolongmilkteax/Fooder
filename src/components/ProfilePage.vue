<template>
  <div class="body">
    <ul class="ul">
      <router-link to="/contribute" class="routes">Contribute</router-link>
      <router-link to="/favpage" class="routes">favpage</router-link>
      <router-link to="/recipe" class="routes">Recipe</router-link>
      <router-link to="/preferencing" class="routes">Preferencing</router-link>
      <router-link to="/restaurant" class="routes">Restaurant</router-link>
      <router-link to="/searchpage" class="routes">Search Page</router-link>
      <router-link to="/" class="routes">Logout</router-link>
      <router-link to="/profile" class="routes">Profile</router-link>
      <router-link to="/characteristic" class="routes">Characteristic</router-link>
      <router-link to="/profileresults" class="routes">ProfileSearch</router-link>
    </ul>
    <div class="profileBorder">
      <p>{{"Name: " + name}}</p>
      <p>{{"Email: " + email}}</p>
      <p>{{"Favourite Recipe: " + favRecipe}}</p>
      <p>{{"Favourite Restaurant: " + favRestaurant}}</p>
      <li id="list" v-for="recipe in contriRecipes" v-bind:key="recipe">
        <h2>{{recipe.name}}</h2>
        <img v-bind:src="recipe.image" alt="Food image" />
        <br />
        <br />
        <br />
        <div id="Description">
          <span>Total preparation time: {{recipe.time}}</span>
          <br />
          <span>Number of servings: {{recipe.servings}}</span>
          <br />
          <span>Difficulty: {{recipe.difficulty}}</span>
          <br />
          <span>Cuisine: {{recipe.cuisine}}</span>
          <br />
          <span>Type: {{recipe.type}}</span>
        </div>
        <button
          id="beginCookingButton"
          v-on:click="go(recipe.ingredients, recipe.directions);"
        >Begin Cooking!</button>
      </li>
      <li id="list" v-for="restaurant in contriRestaurants" v-bind:key="restaurant">
        <h2>{{restaurant.name}}</h2>
        <img v-bind:src="restaurant.image" alt="Restaurant image" />
        <br />
        <br />
        <br />
        <div id="Description">
          <span>Cuisine: {{restaurant.cuisine}}</span>
          <br />
          <span>Opening hours: {{restaurant.openingHours}}</span>
          <br />
          <span>Price range: {{restaurant.priceRange}}</span>
          <br />
          <span>Address: {{restaurant.address}}</span>
          <br />
          <br />
          <button
            id="restaurantWebsite"
            v-on:click="go(restaurant.websiteLink);"
          >Visit Restaurant's Website!</button>
        </div>
      </li>
    </div>
  </div>
</template>

<script>
import db from "../firebase.js";

export default {
  data() {
    return {
      name: "",
      contriRestaurants: [],
      contriRecipes: [],
      email: "",
      favRecipe: "",
      favRestaurant: "",
      uid: ""
    };
  },
  methods: {
    fetchInfo: function() {
      this.uid = db.auth().currentUser.uid;
      db.firestore()
        .collection("user")
        .doc(this.uid)
        .get()
        .then(user => {
          this.name = user.data().name;
          this.favRestaurant = user.data().favRestaurant;
          this.favRecipe = user.data().favRecipe;
          this.email = user.data().email;
          this.fetchRecipes(this.uid);
          this.fetchRestaurants(this.uid);
        });
    },
    fetchRecipes: function(uid) {
      var recipes = [];
      db.firestore()
        .collection("recipe")
        .get()
        .then(snapshot => {
          snapshot.docs.forEach(doc => {
            if (doc.data().authorUID == uid) {
              recipes.push(doc.data());
            }
          });
          this.contriRecipes = recipes;
        });
    },
    fetchRestaurants: function(uid) {
      var restaurants = [];
      db.firestore()
        .collection("restaurant")
        .get()
        .then(snapshot => {
          snapshot.docs.forEach(doc => {
            if (doc.data().authorUID == uid) {
              restaurants.push(doc.data());
            }
          });
          this.contriRestaurants = restaurants;
        });
    }
  },
  created: function() {
    this.fetchInfo();
  }
};
</script>

<style>
.profileBorder {
  display: flex;
  flex-direction: column;
  padding: 5%;
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
</style>