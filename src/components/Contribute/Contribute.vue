<template>
  <div class="body">
    <Cheader></Cheader>
    <div class="ContriDiv">
      <h1 style="margin-top: 40px; margin-bottom: 15px" class="myTitles">Contribute to Fooder!</h1>
      <label for="contributing">Contributing:</label>
      <br />
      <div class="buttonContainer">
        <button
          type="button"
          id="ContriRestaurant"
          class="selectButton leftSelectButton"
          v-on:click="Restaurant"
        >Restaurant</button>
        <button type="button" id="ContriRecipe" class="selectButton" v-on:click="Recipe">Recipe</button>
      </div>
      <br />
      <div v-show="contributeType === 'restaurant'">
        <restaurantform></restaurantform>
      </div>
      <div v-show="contributeType === 'recipe'">
        <recipeform></recipeform>
      </div>
    </div>
    <Cfooter></Cfooter>
  </div>
</template>

<script>
import logout from "../Authentication/logout.js";

export default {
  data() {
    return {
      contributeType: "restaurant"
    };
  },
  methods: {
    logout: logout,
    Restaurant: function() {
      this.contributeType = "restaurant";
      document.getElementById("ContriRestaurant").style.background = "#979797";
      document.getElementById("ContriRecipe").style.background = "#0088cc";
    },
    Recipe: function() {
      this.contributeType = "recipe";
      document.getElementById("ContriRestaurant").style.background = "#0088cc";
      document.getElementById("ContriRecipe").style.background = "#979797";
    },
    created() {
      alert(this.$store.state.authenticated);
      this.Restaurant();
    }
  }
};
</script>

<style>
.ContriDiv {
  margin: 0% 5% 0% 5%;
}

.myTitles {
  font-size: 60px;
  margin-bottom: 10px;
  margin-top: 100px;
  text-align: left;
}

.selectButton {
  background-color: #0088cc;
  width: 20%;
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

.leftSelectButton {
  margin-left: 0px;
  background-color: #979797;
}

.selectButton:hover {
  border: solid #979797 1px;
  background: #979797;
  -webkit-border-radius: 20px;
  -moz-border-radius: 14px;
  border-radius: 8px;
  text-decoration: none;
}

.buttonContainer {
  margin-bottom: 20px;
}
</style>
