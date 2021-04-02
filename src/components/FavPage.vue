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
      <router-link to="/" class="routes">Logout</router-link>
      <router-link to="/profile" class="routes">Profile</router-link>
      <router-link to="/characteristic" class="routes">Characteristic</router-link>
      <router-link to="/profileresults" class="routes">ProfileSearch</router-link>
    </ul>
    <div class="profileBorder">
      <h1 style="text-align:center" v-if="favRecipe!=''">Favourite Recipes</h1>
        <ul id="BriefDescription">
        <li id="list" v-for="recipe in recipes" v-bind:key="recipe">
          <h2>{{recipe.name}}</h2>
          <img v-bind:src="recipe.image" alt="Food image" />
          <br />
          <br />
          <br />
        </li>
        </ul>
        <h1 style="text-align:center" v-if="favRestaurant!=''">Favourite Restaurants</h1>
        <ul id="BriefDescription">
        <li id="list" v-for="restaurant in restaurants" v-bind:key="restaurant">
          <h2>{{restaurant.name}}</h2>
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
import db from '../firebase.js';

export default {
    data(){
        return{
            favRecipe:"",
            favRestaurant:"",
            uid:"",
            restaurants:[],
            recipes:[]
        };
    },
    methods: {
      fetchInfo: function(){
          this.uid = db.auth().currentUser.uid
          db.firestore().collection('user').doc(this.uid).get().then(user =>{
          this.favRestaurant = user.data().favRestaurant;
          this.favRecipe = user.data().favRecipe;
          this.fetchRecipes();
          this.fetchRestaurants(this.uid);
        });
      },
      fetchRecipes: function(){
        db.firestore()
        .collection("recipe")
        .get()
        .then(snapshot => {
          snapshot.docs.forEach(doc => {
            
            if (this.favRecipe.includes(doc.id)) {
              this.recipes.push(doc.data())
            }

          });
        });
      },
      fetchRestaurants: function(){
        db.firestore()
        .collection("restaurant")
        .get()
        .then(snapshot => {
          snapshot.docs.forEach(doc => {
            if (this.favRestaurant.includes(doc.id)) {
              this.restaurants.push(doc.data())
            }
          });
        });
      },
    },
    created: function(){
      this.fetchInfo();
    },
}
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
</style>
