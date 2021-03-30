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
    <div id="block_container">

    <div id="bloc1">
      
      <button class="sortFilterButton" v-on:click="submit = !submit">Sort By:</button><br>
      
      <select v-show="submit" v-model="selected" v-on:change="sort(selected)">
        <option disabled value="">Select option:</option>
        <option value="name">Name</option>
        <option value="cuisine">Cuisine</option>
        <option value="difficulty">Difficulty</option>
        <option value="time">Time</option>
        <option value="type">Type</option>
      </select>

    </div>  

    <div id="bloc2">
      
      <button class="sortFilterButton" v-on:click="filter = !filter">Filter:</button><br>
      
      <button class="filterOpt" v-show="filter" v-on:click="difficulty = !difficulty; type=false; time=false; cuisine=false;">Difficulty</button>
      <button class="miniButton" v-show="difficulty && filter" v-on:click="filterDifficulty('Easy')">Easy</button>
      <button class="miniButton" v-show="difficulty && filter" v-on:click="filterDifficulty('Medium')">Medium</button>
      <button class="miniButton" v-show="difficulty && filter" v-on:click="filterDifficulty('Hard')">Hard</button><br>

      <button class="filterOpt" v-show="filter" v-on:click="type = !type; difficulty=false; time=false; cuisine=false;">Type</button>
      <button class="miniButton" v-show="type && filter" v-on:click="filterType('Main')">Main</button>
      <button class="miniButton" v-show="type && filter" v-on:click="filterType('Side')">Side</button><br>

      <button class="filterOpt" v-show="filter" v-on:click="cuisine = !cuisine; difficulty=false; time=false; type=false;">Cuisine</button>
      <button class="miniButton" v-show="cuisine && filter" v-on:click="filterCuisine('Chinese')">Chinese</button>
      <button class="miniButton" v-show="cuisine && filter" v-on:click="filterCuisine('Western')">Western</button>
      <button class="miniButton" v-show="cuisine && filter" v-on:click="filterCuisine('Italian')">Italian</button>
      <button class="miniButton" v-show="cuisine && filter" v-on:click="filterCuisine('Thai')">Thai</button>
      <button class="miniButton" v-show="cuisine && filter" v-on:click="filterCuisine('Malaysian')">Malaysian</button>
      <button class="miniButton" v-show="cuisine && filter" v-on:click="filterCuisine('Singaporean')">Singaporean</button>
      <button class="miniButton" v-show="cuisine && filter" v-on:click="filterCuisine('Japanese')">Japanese</button>
      <button class="miniButton" v-show="cuisine && filter" v-on:click="filterCuisine('Mediterranean')">Mediterranean</button><br>

      <button class="filterOpt" v-show="filter" v-on:click="time = !time; difficulty=false; type=false; cuisine=false;">Time</button>
    
      <input v-show="time && filter" v-on:change="find()" type="range" list="tickmarks" min="0" max="4" value="50" class="slider" id="myRange">
      <span v-show="time && filter" style="margin-right:15px"><strong>Value: <span id="demo"></span></strong></span>
      <button class="miniButton" v-show="time && filter" v-on:click="filterTime(timeValue)">Submit</button>
      <br>
      <br>
      
    </div>

    </div>
    <div class="borderDiv">
      <PulseLoader id="loading" :loading="isLoading"></PulseLoader>
      <div class="RecipeContainer">
        <div id="Recipe">
          <ul id="BriefDescription">
            <li id="list" v-for="recipe in recipes" v-bind:key="recipe">
              <h2>{{recipe.name}}</h2>
              <img v-bind:src="recipe[1].image" alt="Food image" />
              <br />
              <br />
              <br />
              <div id="Description">
                <span>Cuisine: {{recipe[1].cuisine}}</span>
                <br />
                <span>Type: {{recipe[1].type}}</span>
                <br />                
                <span>Difficulty: {{recipe[1].difficulty}}</span>
                <br />
                <span>Number of servings: {{recipe[1].servings}}</span>
                <br />
                <span>Total preparation time: {{recipe[1].time}}</span>
              </div>
              <div id = "buttons">
              <button
                id="beginCookingButton"
                v-on:click="go(recipe[1].ingredients, recipe[1].directions);"
              >Begin Cooking!</button>
              <button 
                v-if = "favRecipeCheck(recipe[0])" 
                v-on:click = "unfav(recipe[0])"
                id = "fav"
              >
                <img 
                  src ="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678087-heart-512.png"
                >
              </button>
              <button 
                v-if= "!favRecipeCheck(recipe[0])" 
                v-on:click = "fav(recipe[0])"
                id = "unfav">
                <img 
                  src ="https://uxwing.com/wp-content/themes/uxwing/download/15-healthcare-and-medical/heart-black.png"
                >
              </button>
              </div>
              <br />
              <br />
              <br />
              <span id ="credits">Contributed by: {{recipe[1].contributor}}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="footerContainer">
        <p class="footerText">Design by JKJR</p>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from '../firebase.js'
var db = firebase.firestore()
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import {getUid} from '../userObj.js'
export default {
  props: ["searchedValue"],
  data() {
    return {
      isLoading: true,
      recipes: [],
      favRecipe: [],
      submit : false,
      filter : false,
      difficulty : false,
      type : false,
      time: false,
      cuisine: false,
      selected: "",
      timeValue: "",
    };
  },
  
  components: {
    PulseLoader
  },
  
  methods: {
    fetchItems: function() {
      db.collection("recipe")
        .get()
        .then(snapshot => {
          snapshot.docs.forEach(doc => {
            //if empty search return all
            if(this.searchedValue == null){
              this.recipes.push([doc.id,doc.data()]);
            }
            else{

              //if search contain name return recipe
              if(doc.data().name.toUpperCase().includes(this.searchedValue.toUpperCase())) {
                this.recipes.push([doc.id,doc.data()]);
              }else if(doc.data().cuisine.toUpperCase().includes(this.searchedValue.toUpperCase())){
                this.recipes.push([doc.id,doc.data()]);
              }else if(doc.data().difficulty.toUpperCase().includes(this.searchedValue.toUpperCase())){
                this.recipes.push([doc.id,doc.data()]);
              }else if(doc.data().contributor.toUpperCase().includes(this.searchedValue.toUpperCase())){
                this.recipes.push([doc.id,doc.data()]);
              }else if(doc.data().type.toUpperCase().includes(this.searchedValue.toUpperCase())){
                this.recipes.push([doc.id,doc.data()]);
              }
            }
          });
          this.isLoading = false;
        });
    },

    sort: function(input){
      this.recipes=[];
      if (input == "difficulty") {
        db.collection("recipe")
        .get().then(snapshot => {
          var easy = [];
          var medium = [];
          var hard = [];
          snapshot.docs.forEach(doc => {
            if (doc.data()["difficulty"] == "Easy") {
              easy.push([doc.id,doc.data()]);
            } else if (doc.data()["difficulty"] == "Medium") {
              medium.push([doc.id,doc.data()]);
            } else {
              hard.push([doc.id,doc.data()]);
            }
        });
          for (var i = 0; i < easy.length; i++){
            this.recipes.push(easy[i]);
          }
          for (i = 0; i < medium.length; i++){
            this.recipes.push(medium[i]);
          }
          for (i = 0; i < hard.length; i++){
            this.recipes.push(hard[i]);
          }
        });
      } else if (input == "time") {
          db.collection("recipe")
            .get().then(snapshot => {
              var shortest = [];
              var two = [];
              var three = [];
              var four = [];
              var five = [];
              snapshot.docs.forEach(doc => {
                if (doc.data()["time"] == "less than 30mins") {
                  shortest.push([doc.id,doc.data()]);
                } else if (doc.data()["time"] == "30mins to 1h") {
                  two.push([doc.id,doc.data()]);
                } else if (doc.data()["time"] == "1h to 2h") {
                  three.push([doc.id,doc.data()]);
                } else if (doc.data()["time"] == "2h to 3h") {
                  four.push([doc.id,doc.data()]);
                } else if (doc.data()["time"] == "3h to 4h") {
                  five.push([doc.id,doc.data()]);
                }
            });
              for (var i = 0; i < shortest.length; i++){
                this.recipes.push(shortest[i]);
              }
              for (i = 0; i < two.length; i++){
                this.recipes.push(two[i]);
              }
              for (i = 0; i < three.length; i++){
                this.recipes.push(three[i]);
              }
              for (i = 0; i < four.length; i++){
                this.recipes.push(four[i]);
              }
              for (i = 0; i < five.length; i++){
                this.recipes.push(five[i]);
              }
            });
      } else {
          db.collection("recipe").orderBy(input)
          .get().then(snapshot => {
            snapshot.docs.forEach(doc => {
              this.recipes.push([doc.id,doc.data()]);
          });
          });
        }
      this.submit=false;
    },

    filterCuisine: function() {
      this.recipes=[];
      db.collection("recipe").where("cuisine","==","Chinese")
      .get().then(snapshot => {
        snapshot.docs.forEach(doc => {
          this.recipes.push([doc.id,doc.data()]);
      });
      });
      this.filter=false;
      this.cuisine=false;
    },

    filterType: function(type) {
      this.recipes=[];
      db.collection("recipe").where("type","==",type)
      .get().then(snapshot => {
        snapshot.docs.forEach(doc => {
          this.recipes.push([doc.id,doc.data()]);
      });
      });
      this.filter=false;
      this.type=false;
    },

    filterDifficulty: function(difficulty) {
      this.recipes=[];
      db.collection("recipe").where("difficulty","==",difficulty)
      .get().then(snapshot => {
        snapshot.docs.forEach(doc => {
          this.recipes.push([doc.id,doc.data()]);
      });
      });
      this.filter=false;
      this.difficulty=false;
    },

    filterTime: function(time) {
      this.recipes=[];
      db.collection("recipe").where("time","==",time)
      .get().then(snapshot => {
        snapshot.docs.forEach(doc => {
          this.recipes.push([doc.id,doc.data()]);
      });
      });
      this.filter=false;
      this.time=false;
    },

    find: function() {
      var slider = document.getElementById("myRange");
      var output = document.getElementById("demo");
      var values = ["less than 30mins", "30mins to 1h", "1h to 2h", "2h to 3h", "3h to 4h"];
      output.innerHTML = values[slider.value];
      this.timeValue = values[slider.value];
    },

    go: function(ingredients, directions) {
      this.$router.push({
        name: "FullRecipe",
        params: { i: ingredients, d: directions }
      });
    },
    getFavourites: function() {
      db.collection('user').doc(getUid()).get().then((doc) => {
        this.favRecipe = doc.data().favRecipe;
      });
    },
    favRecipeCheck: function(id) {
      return this.favRecipe.includes(id);
    },
    unfav: function(id) {
      db.collection('user').doc(getUid()).update({
        "favRecipe": firebase.firestore.FieldValue.arrayRemove(id)})
        .then (() =>
        location.reload()
      )
    },
    fav: function(id) {
      db.collection('user').doc(getUid()).update({
        "favRecipe": firebase.firestore.FieldValue.arrayUnion(id)})
        .then(() =>
        location.reload()
      )
    }
  },
  created() {
    this.fetchItems();
    this.getFavourites();
  },
  updated() {
    this.getFavourites();
  }
};
</script>

<style scoped>

.borderDiv {
  position:relative;
  bottom:50px;
}

.RecipeContainer {
  width: 100%;
  padding-right: 20px;
}

#BriefDescription {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  line-height: 5px;
}

#beginCookingButton {
  background: #0088cc;
  width: 150px;
  border-radius: 8px;
  color: #ffffff;
  font-family: Helvetica;
  font-size: 18px;
  font-weight: 100;
  padding: 5px;
  border: solid #0088cc 1px;
}

#beginCookingButton:hover {
  border: solid #979797 1px;
  background: #979797;
  -webkit-border-radius: 20px;
  -moz-border-radius: 14px;
  border-radius: 8px;
  text-decoration: none;
  cursor: pointer;
}
#Description {
  line-height: 20px;
  text-align: center;
}

#list {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 5px;
  border: 1px solid #222;
  margin: 10px;
  width: 300px;
  max-width: 300px;
  height: 350px;
  max-height: 350px;
}
img {
  width: 100px;
  height: 100px;
}

h2,img {
  padding-right: 20px;
  text-align: center;
  justify-content: center;
}

#FullRecipe {
  padding: 10px;
}

#Directions {
  list-style-type: none;
}

#loading {
  min-height: 30em;
  align-items: center;
  display: flex;
  justify-content: center;
}
#credits {
  float: right;
}

#fav img {
  height: 35px;  
  width: 35px;
}

#fav {
  border: none;
  width: 50px;
  height: 43px;
  text-align: center;
  border-radius: 8px;
  transform: translate(0px, 10px);
}

#fav:hover {
  cursor: pointer;
}

#unfav img {
  height: 30px;  
  width: 33px;
}

#unfav {
  border: none;
  width: 50px;
  height: 43px;
  text-align: center;
  border-radius: 8px;
  padding-top: 5px;
  transform: translate(0px, 9px);
}

#unfav:hover {
  cursor: pointer;
}

.sortFilterButton {
  background: #0088cc;
  width: 100px;
  border-radius: 8px;
  color: #ffffff;
  font-family: Helvetica;
  font-size: 18px;
  font-weight: 100;
  padding: 5px;
  border: solid #0088cc 1px;
  margin-bottom: 5px;
}

.miniButton {
  background: turquoise;
  border-radius: 8px;
  
}

.filterOpt {
  margin-right:50px;
  background: teal;
  color: #ffffff;
  font-weight: 100;
  border-radius: 8px;
  border: solid teal 1px;
  width: 80px
}

.filterOpt:hover {
  background-color: #4CAF50;
  color: white;
}

.filterOpt:focus{
    background:olive;
}

#block_container {

    height: 125px;
    overflow: hidden;
    position: relative;
    z-index : 1;
}

#bloc1 {
    width: 200px;
    float:left; 
}
#bloc2 {
    overflow: hidden; 
}
</style>



