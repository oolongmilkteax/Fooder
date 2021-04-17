<template>
  <div class="body">
    <Cheader></Cheader>

    <div class="BorderDiv">
      <p style="margin-top:20px" class="searchHeader">Fooder</p>
      <div class="searchDiv">
        <h2>Search for:</h2>
        <button
          type="button"
          id="Restaurant"
          class="searchButton"
          v-on:click="Restaurant"
        >Restaurant</button>

        <button type="button" id="Recipe" class="searchButton" v-on:click="Recipe">Recipe</button>
        <button type="button" id="Profile" class="searchButton" v-on:click="Profile">Profile</button>
      </div>
      <input
        type="text"
        class="searchInput"
        v-model="searchValue"
        placeholder="Search for Restaurants, Recipes, or Profiles!"
      />

      <div class="button-centraliser">
        <button class="myButton" v-on:click="search()" v-if="searchValue.length == 0">Search All</button>
        <button class="myButton" v-on:click="search()" v-if="searchValue.length != 0">Search</button>
      </div>
      <p class="errorMsg2" v-if="noSearch">Please select a category to proceed.</p>
    </div>
    <Cfooter></Cfooter>
  </div>
</template>

<script>
import logout from "./Authentication/logout.js";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

export default {
  methods: {
    logout: logout,
    Restaurant: function() {
      document.getElementById("Restaurant").style.background = "#979797";
      document.getElementById("Recipe").style.background = "#0088cc";
      document.getElementById("Profile").style.background = "#0088cc";
      this.recipe = false;
      this.restaurant = true;
      this.profile = false;
      this.noSearch = false;
    },
    Recipe: function() {
      document.getElementById("Restaurant").style.background = "#0088cc";
      document.getElementById("Recipe").style.background = "#979797";
      document.getElementById("Profile").style.background = "#0088cc";
      this.recipe = true;
      this.restaurant = false;
      this.profile = false;
      this.noSearch = false;
    },
    Profile: function() {
      document.getElementById("Restaurant").style.background = "#0088cc";
      document.getElementById("Recipe").style.background = "#0088cc";
      document.getElementById("Profile").style.background = "#979797";
      this.recipe = false;
      this.restaurant = false;
      this.profile = true;
      this.noSearch = false;
    },
    searchRecipe: function() {
      this.$router.push({
        name: "Recipe",
        params: { searchedValue: this.searchValue }
      });
    },
    searchRestaurant: function() {
      this.$router.push({
        name: "Restaurant",
        params: { searchedValue: this.searchValue }
      });
    },
    searchProfile: function() {
      this.$router.push({
        name: "ProfileSearch",
        params: { searchedValue: this.searchValue }
      });
    },
    search: function() {
      if (this.recipe) {
        this.searchRecipe();
      }
      if (this.restaurant) {
        this.searchRestaurant();
      }
      if (this.profile) {
        this.searchProfile();
      } else {
        this.noSearch = true;
      }
    }
  },
  data() {
    return {
      searchValue: "",
      recipe: false,
      restaurant: false,
      profile: false,
      noSearch: false,
    };
  }
};
</script>

<style>
.searchButton {
  background: #0088cc;
  width: 8%;
  border-radius: 8px;
  border-radius: 8px;
  color: #ffffff;
  font-family: Helvetica;
  font-size: 21px;
  font-weight: 100;
  padding: 5px;
  border: solid #0088cc 1px;
  margin: 0px 5px 5px 5px;
}
.searchDiv {
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
#Restaurant {
  background-color: #0088cc;
  margin-left: 20px;
}

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

.bottomFooter {
  position: absolute;
  bottom: 0;
}

.errorMsg2 {
  text-align: center;
  color: red;
}

.BorderDiv {
  min-height: 56%;
}
</style>
