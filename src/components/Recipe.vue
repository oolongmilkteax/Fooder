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
    </ul>
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
      favRecipe: []
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
</style>



