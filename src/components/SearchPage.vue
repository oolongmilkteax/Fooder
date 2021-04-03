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

    <div id="sortContent" class="sidenav">
      <a href="javascript:void(0)" class="closebtn" v-on:click="closeSort()">&times;</a>
      <a href="#">About</a>
      <a href="#">Services</a>
      <a href="#">Clients</a>
      <a href="#">Contact</a>
    </div>

    
    <div id="sortFeature">
      <span style="font-size:30px;cursor:pointer" v-on:click="openSort()">&#9776; Sort</span>
    </div>

    

    <div id="filterContent" class="sidenav">
      <a href="javascript:void(0)" class="closebtn" v-on:click="closeFilter()">&times;</a>
      <button class="dropdown-btn" v-on:click="showDifficulty()" id="filDifficulty">Difficulty
        <i class="fa fa-caret-down"></i>
      </button>
      
      <div class="dropdown-container" id="filDifficultyChoice">
        <a id="easyChoice" v-on:click="difficultyChoice=['difficulty','Easy']" >Easy</a>
        <a id="mediumChoice" v-on:click="difficultyChoice=['difficulty','Medium']">Medium</a>
        <a id="hardChoice" v-on:click="difficultyChoice=['difficulty','Hard']">Hard</a>

      </div>

      <button class="dropdown-btn" v-on:click="showCuisine()" id="filCuisine">Cuisine
        <i class="fa fa-caret-down"></i>
      </button>
      <div class="dropdown-container" id="filCuisineChoice">
      <div  v-for="cuisine in cuisines" v-bind:key="cuisine">
        <a v-on:click="cuisineChoice=['cuisine', cuisine]">{{cuisine}}</a>
      </div>
      </div>

      <button class="dropdown-btn" v-on:click="showTime()" id="filTime">Time
        <i class="fa fa-caret-down"></i>
      </button>
      
      <div class="dropdown-container" id="filTimeChoice">
        <input v-on:change="find()" type="range" list="tickmarks" min="0" max="4" value="50" class="slider" id="myRange"><br>
        <span><strong>Value: <span id="demo"></span></strong></span>

      </div>

      <button class="dropdown-btn" v-on:click="showType()" id="filType">Type
        <i class="fa fa-caret-down"></i>
      </button>
      
      <div class="dropdown-container" id="filTypeChoice">
        <a  v-on:click="typeChoice=['type','Main']" >Main</a>
        <a  v-on:click="typeChoice=['type','Side']">Side</a>
    

      </div>

      <a id="submit" style="font-size:30px;cursor:pointer;"><strong>Search</strong></a>
      
    </div>

    <div id="filterSort">
      <span style="font-size:30px;cursor:pointer" v-on:click="openFilter()">&#9776; Filter</span>
    </div>
    
    
    <!--
    <p>{{difficultyChoice}}</p>
    <p>{{timeValue}}</p>
    <p>{{cuisineChoice}}</p>
    <p>{{typeChoice}}
    -->

    <div class="BorderDiv">
      <p class="searchHeader">Fooder</p>
      <div class="searchDiv">
        <h2>Search for:</h2>
        <button
          type="button"
          id="Restaurant"
          class="searchButton"
          v-on:click="Restaurant"
        >
          Restaurant
        </button>
        <button
          type="button"
          id="Recipe"
          class="searchButton"
          v-on:click="Recipe"
        >
          Recipe
        </button>
        <button
          type="button"
          id="Profile"
          class="searchButton"
          v-on:click="Profile"
        >
          Profile
        </button>
      </div>
      <input
        type="text"
        class="searchInput"
        v-model="searchValue"
        placeholder="Search for Restaurants or Recipes!"
      />
      <div class="button-centraliser">
        <button class="myButton" v-on:click="search()">Search</button>
      </div>
      <div class="footerContainer">
        <p class="footerText">Design by JKJR</p>
      </div>
    </div>
  </div>
</template>

<script>
import logout from "./logout.js";
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
    searchRecipe: function() {
      this.$router.push({
        name: "Recipe",
        params: { searchedValue: this.searchValue },
      });
    },
    searchRestaurant: function() {
      this.$router.push({
        name: "Restaurant",
        params: { searchedValue: this.searchValue },
      });
    },
    searchProfile: function() {
      this.$router.push({
        name: "ProfileSearch",
        params: { searchedValue: this.searchValue },
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
      }
    },
    openSort: function() {
      document.getElementById("sortContent").style.width = "220px";
      //document.getElementById("sortFeature").style.marginLeft = "250px";
    },
    closeSort: function() {
      document.getElementById("sortContent").style.width = "0";
      //document.getElementById("sortFeature").style.marginLeft= "0";
    },
    openFilter: function() {
      document.getElementById("filterContent").style.width = "220px";
      document.getElementById("filterFeature").style.marginLeft = "250px";
    },
    closeFilter: function() {
      document.getElementById("filterContent").style.width = "0";
      document.getElementById("filterFeature").style.marginLeft= "0";
    },
    showDifficulty: function() {
      
      if (document.getElementById("filDifficultyChoice").style.display === "block") {
        document.getElementById("filDifficultyChoice").style.display = "none";
      }
       else {
         document.getElementById("filDifficultyChoice").style.display = "block";
       }
       
    },
    showCuisine: function() {
      
      if (document.getElementById("filCuisineChoice").style.display === "block") {
        document.getElementById("filCuisineChoice").style.display = "none";
      }
       else {
         document.getElementById("filCuisineChoice").style.display = "block";
       }
    },
    showTime: function() {
      
      if (document.getElementById("filTimeChoice").style.display === "block") {
        document.getElementById("filTimeChoice").style.display = "none";
      }
       else {
         document.getElementById("filTimeChoice").style.display = "block";
       }
       
    },
    showType: function() {
      
      if (document.getElementById("filTypeChoice").style.display === "block") {
        document.getElementById("filTypeChoice").style.display = "none";
      }
       else {
         document.getElementById("filTypeChoice").style.display = "block";
       }
       
    },
    find: function() {
      var slider = document.getElementById("myRange");
      var output = document.getElementById("demo");
      var values = ["less than 30mins", "30mins to 1h", "1h to 2h", "2h to 3h", "3h to 4h"];
      output.innerHTML = values[slider.value];
      this.timeValue = values[slider.value];
    },
  },
  data() {
    return {
      searchValue: "",
      recipe: true,
      restaurant: false,
      profile: false,
      cuisines:['Chinese','Western','Italian','French','Japanese','German','Spanish','Singaporean','Malaysian','Indian','Fusion','Thai',],
      difficultyChoice:[],
      timeValue: "",
      cuisineChoice:[],
      typeChoice: [],
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

.sidenav {
  height: 100%;
  width: 0;
  position: absolute;
  z-index: 1;
  top: 140px;
  left: 0;
  background-color: #111;
  overflow-x: hidden;
  transition: 0.5s;
  /*padding-top: 60px;
  top: 140px*/
}

.sidenav a {
  padding: 8px 8px 8px 16px;
  text-decoration: none;
  font-size: 20px;
  color: #818181;
  display: block;
  transition: 0.3s;
}

.sidenav a:hover {
  color: #f1f1f1;
}

#submit:hover  {
  color: #f1f1f1;
}

.sidenav .closebtn {
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
}

#main {
  transition: margin-left .5s;
  padding: 16px;
}

@media screen and (max-height: 450px) {
  .sidenav {padding-top: 15px;}
  .sidenav a {font-size: 18px;}
}

.dropdown-btn {
  padding: 6px 8px 6px 16px;
  text-decoration: none;
  font-size: 20px;
  color: #818181;
  display: block;
  border: none;
  background: none;
  width: 100%;
  text-align: left;
  cursor: pointer;
  outline: none;
}

.dropdown-btn:hover {
  color: #f1f1f1;
}

.active {
  background-color: #0088cc;
  color: white;
}

.dropdown-container {
  display: none;
  background-color: #262626;
  padding-left: 8px;
}

/* Optional: Style the caret down icon */
.fa-caret-down {
  float: right;
  padding-right: 8px;
}
</style>
