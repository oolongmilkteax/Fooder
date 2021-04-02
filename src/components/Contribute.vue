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
    <div class="ContriDiv">
      <h1 class="myTitles">Contribute to Fooder!</h1>
      <label for="contributing">Contributing:</label>
      <br />
      <button
        type="button"
        id="Restaurant"
        class="selectButton"
        v-on:click="Restaurant"
      >
        Restaurant
      </button>
      <button
        type="button"
        id="Recipe"
        class="selectButton"
        v-on:click="Recipe"
      >
        Recipe
      </button>
      <br />
      <div v-show="contributeType === 'restaurant'">
        <restaurantform></restaurantform>
      </div>
      <div v-show="contributeType === 'recipe'">
        <recipeform></recipeform>
      </div>
      <div class="footerContainer">
        <p class="footerText">Design by JKJR</p>
      </div>
    </div>
  </div>
</template>

<script>
import logout from "./logout.js";

export default {
  data() {
    return {
      contributeType: "nothing",
    };
  },
  methods: {
    logout: logout,
    Restaurant: function() {
      this.contributeType = "restaurant";
      document.getElementById("Restaurant").style.background = "#979797";
      document.getElementById("Recipe").style.background = "#0088cc";
    },
    Recipe: function() {
      this.contributeType = "recipe";
      document.getElementById("Restaurant").style.background = "#0088cc";
      document.getElementById("Recipe").style.background = "#979797";
    },
    created() {
      alert(this.$store.state.authenticated);
    },
  },
};
</script>

<style>
.ContriDiv {
  margin: 0% 5% 0% 5%;
}
.myTitles {
  font-size: 60px;
  margin-bottom: 5px;
  margin-top: 30px;
  text-align: left;
}

.selectButton {
  background: #0088cc;
  width: 20%;
  border-radius: 8px;
  border-radius: 8px;
  color: #ffffff;
  font-family: Helvetica;
  font-size: 28px;
  font-weight: 100;
  padding: 14px;
  border: solid #0088cc 1px;
  margin-top: 30px;
  margin: 5px;
}

.selectButton:hover {
  border: solid #979797 1px;
  background: #979797;
  -webkit-border-radius: 20px;
  -moz-border-radius: 14px;
  border-radius: 8px;
  text-decoration: none;
}
</style>
