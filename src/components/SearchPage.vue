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
    <div class="BorderDiv">
      <p class="searchHeader">Fooder</p>
        <div class="searchDiv">
        <h2>Search for:</h2>
        <button type="button" id = "Restaurant" class="searchButton" v-on:click="Restaurant">Restaurant</button>
        <button type="button" id = "Recipe" class="searchButton" v-on:click="Recipe">Recipe</button>
        <button type="button" id = "Profile" class="searchButton" v-on:click="Profile">Profile</button>
      </div>
      <input type="text" class="searchInput" v-model="searchValue" placeholder="Search for Restaurants or Recipes!" />
      <div class="button-centraliser">
        <button class="myButton" v-on:click='search()'>Search</button>
      </div>
      <div class="footerContainer">
        <p class="footerText">Design by JKJR</p>
      </div>
    </div>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
export default {
  methods:{
    Restaurant: function() {
      document.getElementById("Restaurant").style.background = "#979797";
      document.getElementById("Recipe").style.background = "#0088cc";
      document.getElementById("Profile").style.background = "#0088cc";
      this.recipe = false;
      this.restaurant = true;
      this.profile = false;
    },
    Recipe: function() {
      document.getElementById("Restaurant").style.background = "#0088cc";
      document.getElementById("Recipe").style.background = "#979797";
      document.getElementById("Profile").style.background = "#0088cc";
      this.recipe = true;
      this.restaurant = false;
      this.profile = false;
    },
    Profile: function() {
      document.getElementById("Restaurant").style.background = "#0088cc";
      document.getElementById("Recipe").style.background = "#0088cc";
      document.getElementById("Profile").style.background = "#979797";
      this.recipe = false;
      this.restaurant = false;
      this.profile = true;
    },
    searchRecipe: function(){
      this.$router.push({ name: 'Recipe', params: {searchedValue: this.searchValue}})
    },
    searchRestaurant: function(){
      this.$router.push({ name: 'Restaurant', params: {searchedValue: this.searchValue}})
    },
    searchProfile: function(){
      this.$router.push({ name: 'ProfileSearch', params: {searchedValue: this.searchValue}})
    },
    search: function(){
      if(this.recipe){
        this.searchRecipe();
      }
      if(this.restaurant){
        this.searchRestaurant();
      }
      if(this.profile){
        this.searchProfile();
      }
    },
  },
  data() {
    return {
      searchValue: "",
      recipe: true,
      restaurant: false,
      profile:false,
    };
  },
};
</script>

<style>

.searchButton {
  background: #0088cc;
  width: 10%;
  border-radius: 8px;
  border-radius: 8px;
  color: #ffffff;
  font-family: Helvetica;
  font-size: 21px;
  font-weight: 100;
  padding: 5px;
  border: solid #0088cc 1px;
  margin-top: 30px;
  margin: 5px;
}
.searchDiv{
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 10px;
}

.contriInput {
  padding: 10px;
  border-radius: 30px;
  border-color: #ffffff;
  border-style: solid;
  outline: none;
  margin-top: 7px;
  margin-bottom: 20px;
  width: 40%;
}

/* search page */
.searchInput {
  padding: 15px;
  border-radius: 30px;
  border-color: #ffffff;
  border-style: solid;
  outline: none;
  align-self: center;
  width: 70%;
  display: block;
  margin-left: auto;
  margin-right: auto;
  font-size: 20px;
}

.searchHeader {
  text-align: center;
  color: black;
  font-size: 32px;
  font-family: Helvetica;
}
.logo {
  color: gray;
  font-size: 50px;
  font-family: -apple-system;
  margin: auto;
}

/* search page */
.searchInput {
  padding: 15px;
  border-radius: 30px;
  border-color: #ffffff;
  border-style: solid;
  outline: none;
}

.searchHeader {
  text-align: center;
  color: black;
  font-size: 32px;
  font-family: Helvetica;
  padding: 20px;
}
</style>