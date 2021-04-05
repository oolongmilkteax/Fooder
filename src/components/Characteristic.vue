<template>
  <div class="body">
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
    <div v-if="isLoaded">
      <radar-chart :parsedData="parsedData"></radar-chart>
    </div>
    <div class="preferenceDiv">
      <h3>{{ "Favourite Cuisine: " + this.cuisine }}</h3>
      <h3>{{ "Type of Eater: " + this.type }}</h3>
      <h2>Here are some recommendations we have for you!</h2>
    </div>
    <li class="characteristicslist" v-for="item in recommendedThings" v-bind:key="item.id">
      <div class="pointDiv">
        {{item.name}} 
        <img v-bind:src="item.image" alt="Food image" />
        <button class="myButton smaller" v-on:click="go(item)">Go!</button>
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
import logout from "./logout.js";
export default {
  components: {
    RadarChart,
  },
  data() {
    return {
      parsedData:[],
      cuisine:"",
      type:"",
      recommendedThings: [],
      preferences:[],
      isLoaded:false,
    };
  },
  methods: {
    logout: logout,
    typeFinder: function() {
      if (this.preferences[1] > 20 && this.preferences[2] >= 15) {
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
  created: function() {
    db.collection("user")
        .doc(this.$store.state.uid)
        .get()
        .then((doc) => {
          this.preferences = doc.data().preferences;
          if (this.preferences.length == 5) {
            this.cuisine = this.preferences.pop();
            this.parsedData = this.preferences;
          }
          this.isLoaded = true;
          this.typeFinder();
    }); 
  },
};
</script>

<style>
.preferenceDiv {
  text-align: center;
}

.characteristicslist {
  text-align: center;
  padding: 5px;
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

.smaller{
  width: 25%;
}

</style>
