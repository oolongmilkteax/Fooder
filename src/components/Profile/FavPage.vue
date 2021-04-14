<template>
  <div class="body">
    <Cheader></Cheader>
    <PulseLoader  color="#0088cc" id="loading" :loading="isLoading"></PulseLoader> 
    
    <div v-show="!isLoading" class="profileBorder">
      <div id="emptyFav" v-if="favRecipe == '' && favRestaurant == ''">
        <span style="text-align:center">You have liked 0 items so far</span>
        <br>
        <div>
          <button
            id="favButton"
            v-on:click="favouriteRecipe"
          >Find your favourite recipes!
          </button>
          <button
            id="favButton"
            v-on:click="favouriteRestaurant"
          >Find your favourite restaurants!
          </button>
        </div>
      </div>
      <h1 style="text-align:center" v-if="favRecipe != ''">Favourite Recipes</h1>
      <ul id="BriefDescription">
        <b-card-group deck class="mx-auto">
          <li
          id="profilelist"
          class="ml-3"
          v-for="recipe in recipes"
          v-bind:key="recipe[1].name"
          >  
          <b-card class="mb-4 mx-auto" style="width: 23rem;" no-body>
            <b-card-img :src="recipe[1].image" top v-on:click="go(recipe[1].ingredients,recipe[1].directions)" > </b-card-img>
            <b-card-body>
              <p style="text-align:center; font-size:24px">{{recipe[1].name}}</p>
              <b-button pill variant="primary" style="float:right" v-on:click="unfavRecipe(recipe[0])">Unfavourite</b-button>
            </b-card-body>

          </b-card>
          </li>
        </b-card-group>
      </ul>    
      <h1 style="text-align:center" v-if="favRestaurant != ''">Favourite Restaurants</h1>
      <ul id="BriefDescription">
        <b-card-group deck class="mx-auto">
          <li
          id="profilelist"
          class="ml-3 "
          v-for="restaurant in restaurants"
          v-bind:key="restaurant[1].name"
          >  
           <b-card class="mb-4 mx-auto" style="width: 23rem;" no-body>
            <b-card-img :src="restaurant[1].image" top v-on:click="goWebsite(restaurant[1].websiteLink)"> </b-card-img>
            <b-card-body>
              <p style="text-align:center; font-size:24px">{{restaurant[1].name}}</p>
              <b-button pill variant="primary" style="float:right" v-on:click="unfavRestaurant(restaurant[0])">Unfavourite</b-button>
            </b-card-body>

          </b-card>
          </li>
        </b-card-group>
      </ul>
    
    </div>
    <Cfooter></Cfooter>
  </div>
</template>

<script>
import db from "../Authentication/firebase.js";
import logout from "../Authentication/logout.js";
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
              this.recipes.push([doc.id,doc.data()]);
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
              this.restaurants.push([doc.id,doc.data()]);
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
    goWebsite: function(url) {
      window.open(url);
    },
    favouriteRecipe: function() {
      this.$router.push({ path: "/recipe" })
    },
    favouriteRestaurant: function() {
      this.$router.push({ path: "/restaurant" })
    },
    unfavRecipe: function(id) {
      db.firestore().collection('user').doc(this.$store.state.uid).update({
        "favRecipe": db.firestore.FieldValue.arrayRemove(id)});
      for(var i = 0; i < this.recipes.length; i++){ 
        if ( this.recipes[i][0] === id) { 
            this.recipes.splice(i, 1); 
           
        }
        if ( this.favRecipe[i] === id) { 
            this.favRecipe.splice(i, 1); 
           
        }
      } 
    },
    unfavRestaurant: function(id) {
      db.firestore().collection('user').doc(this.$store.state.uid).update({
        "favRestaurant": db.firestore.FieldValue.arrayRemove(id)});
      for(var i = 0; i < this.restaurants.length; i++){ 
        if ( this.restaurants[i][0] === id) { 
            this.restaurants.splice(i, 1); 
            
        }
        if ( this.favRestaurant[i] === id) { 
            this.favRestaurant.splice(i, 1); 
           
        }
      } 
    },
    
  },
  created: function() {
    this.fetchInfo();
  }
};
</script>

<style>
img {
  width: 100%;
  height: 15rem;
  object-fit: cover;
}

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

#emptyFav {
  line-height: 50px;
  text-align: center;
  font-size: 28px;
}

#favButton {
  background: #0088cc;
  width: 320px;
  border-radius: 8px;
  color: #ffffff;
  font-family: Helvetica;
  font-weight: 100;
  padding: 10px;
  border: solid #0088cc 1px;
  font-size: 20px;
  font-weight: 100;
  margin:20px;
}

#contributeButton:hover {
  border: solid #979797 1px;
  background: #979797;
  -webkit-border-radius: 20px;
  -moz-border-radius: 14px;
  border-radius: 8px;
  text-decoration: none;
}

</style>
