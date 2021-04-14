<template>
  <div class="body">
  <Cheader></Cheader>
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
    <Cfooter v-if="contributed"></Cfooter>
    <Cfooter v-if="contributed == false" class="bottomFooter"></Cfooter>
  </div>
  
</template>

<script>
import db from "../Authentication/firebase.js";
import logout from "../Authentication/logout.js";
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
      contributed:true,
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
            if(this.contriRecipes.length == 0){
              this.contributed = false;
            }
            if(this.contriRestaurants.length == 0){
              this.contributed = false;
            }
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
          if(this.contriRecipes.length == 0){
              this.contributed = false;
            }
            if(this.contriRestaurants.length == 0){
              this.contributed = false;
            }
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
.bottomFooter{
  position: fixed;
  left: 0;
  bottom: 0;
}
</style>
