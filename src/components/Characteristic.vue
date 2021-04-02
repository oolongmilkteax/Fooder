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
    <radar-chart :parsedData="parsedData"></radar-chart>
    <div class="preferenceDiv">
      <h3>{{"Favourite Cuisine: " + this.cuisine}}</h3>
      <h3>{{"Type of Eater: " + this.type}}</h3>
      <h2>Here are some recommendations we have for you!</h2>
    </div>
    <li class="characteristicslist" v-for="item in recommendedThings" v-bind:key="item.id">
      <div class="individualRecommendation">
        <div class="pointDiv">
          {{item.name}}
          <img v-bind:src="item.image" alt="Food image" />
          <button class="myButton" v-on:click="go(item)">Go!</button>
        </div>
      </div>
    </li>
    <b-button href="/searchpage" class = "gotoSearchPage">Find your own Recipes and Restaurants!</b-button>
    <div class="footerContainer">
      <p class="footerText">Design by JKJR</p>
    </div>
  </div>
</template>

<script>
import firebase from '../firebase.js'
var db = firebase.firestore()
import RadarChart from './RadarChart.js';
export default {
  components: {
    RadarChart,
  },
  props: ['preferences'],
  data() {
    return {
      parsedData:[],
      cuisine:"",
      type:"",
      recommendedThings: [],
    };
  },
  methods: {
    typeFinder: function() {
      if(this.preferences[1] > 20 && this.preferences[2]>=15){
        this.type = "Adventurous Foodie";
        db.collection("restaurant").orderBy('name').limit(3)
        .get()
        .then(snapshot => {
          snapshot.docs.forEach(doc => {
              this.recommendedThings.push(doc.data());
          });
        });
      }else if(this.preferences[0] > 20 && this.preferences[3]>=15){
        this.type = "Home Cook";
        db.collection("recipe").orderBy('name').limit(3)
        .get()
        .then(snapshot => {
          snapshot.docs.forEach(doc => {
              this.recommendedThings.push(doc.data());
          });
        });
      }else{
        this.type = "Not-So-Picky Eater";
        db.collection("recipe").orderBy('name').limit(2)
        .get()
        .then(snapshot => {
          snapshot.docs.forEach(doc => {
              this.recommendedThings.push(doc.data());
          });
        });
        db.collection("restaurant").orderBy('name').limit(2)
        .get()
        .then(snapshot => {
          snapshot.docs.forEach(doc => {
              this.recommendedThings.push(doc.data());
          });
        });
      }
    },
    go:function(item){
      if(item.address != null){
        this.goRestaurant(item.websiteLink);
      }else{
        this.goRecipe(item.ingredients,item.directions);
      }
    },
    goRecipe: function(ingredients, directions) {
      this.$router.push({
        name: "FullRecipe",
        params: { i: ingredients, d: directions }
      });
    },
    goRestaurant: function(url) {
      window.open(url);
    },
  },
  created: function(){
    if(this.preferences.length==5){
      this.cuisine = this.preferences.pop()
      this.parsedData = this.preferences;
    }
    this.typeFinder();
    console.log(this.recommendedThings);
  },
}
</script>

<style>
.preferenceDiv{
    text-align: center;
}

.characteristicslist {
  text-align: center;
  padding: 5px;
  border: 1px solid #222;
  margin: 10px;
  list-style-type: none;
}

.pointDiv{
  flex-direction: column;
  display: flex;
  align-items: center;
}

.gotoSearchPage{
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 20%;
}

</style>