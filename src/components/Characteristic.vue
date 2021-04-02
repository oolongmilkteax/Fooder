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
    <radar-chart :parsedData="parsedData"></radar-chart>
    <div class="preferenceDiv">
      <h3>{{ "Favourite Cuisine: " + this.cuisine }}</h3>
      <h3>{{ "Type of Eater: " + this.type }}</h3>
      <h2>Here are some recommendations we have for you!</h2>
    </div>
  </div>
</template>

<script>
import RadarChart from "./RadarChart.js";
import logout from "./logout.js";

export default {
  components: {
    RadarChart,
  },
  props: ["preferences"],
  data() {
    return {
      parsedData: [],
      cuisine: "",
      type: "",
    };
  },
  methods: {
    logout: logout,
    typeFinder: function() {
      if (this.preferences[1] > 20 && this.preferences[2] >= 15) {
        this.type = "Adventurous Foodie";
      } else if (this.preferences[0] > 20 && this.preferences[3] >= 15) {
        this.type = "Home Cook";
      } else {
        this.type = "Not-So-Picky Eater";
      }
    },
  },
  created: function() {
    if (this.preferences.length == 5) {
      this.cuisine = this.preferences.pop();
      this.parsedData = this.preferences;
    }
    this.typeFinder();
  },
};
</script>

<style>
.preferenceDiv {
  text-align: center;
}
</style>
