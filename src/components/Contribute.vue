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
    </ul>
    <div class="ContriDiv">
      <h1 class="myTitles">Contribute to Fooder!</h1>
      <hr />
        <label for="contributing">Contributing:</label>
        <br />
        <button type="button" class="selectButton" v-on:click="Restaurant">Restaurant</button>
        <button type="button" class="selectButton" v-on:click="Recipe">Recipe</button>
        <br />
        <div v-show="contributeType === 'restaurant'">
          <!-- <contribRest></contribRest>> -->
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
export default {
  data() {
    return {
      contributeType: "nothing", 
    };
  },
  methods: {
    Restaurant: function() {
      this.contributeType = "restaurant";
    },
    Recipe: function() {
      this.contributeType = "recipe";
    },
  }
};
</script>

<style>

.ContriDiv{
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