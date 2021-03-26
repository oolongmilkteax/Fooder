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
      <router-link to="/profilesearch" class="routes">ProfileSearchPage</router-link>
    </ul>
    <div class="borderDiv">
      <h1 class="myTitles">Contribute to Fooder!</h1>
      <hr />
      <form>
        <label for="contributing">Contributing:</label>
        <br />
        <button type="button" v-on:click="Restaurant">Restaurant</button>
        <button type="button" v-on:click="Recipe">Recipe</button>
        <br />
        <div v-show="contributeType === 'restaurant'">
          <label for="restName">Restaurant Name:</label>
          <br />
          <input class="contriInput" type="text" id="restName2" name="restName" />
          <br />

          <label for="restAddress">Restaurant Address:</label>
          <br />
          <input class="contriInput" type="text" id="restAddress" name="restAddress" />
          <br />

          <label for="openingHours">Opening hours:</label>
          <br />
          <input class="contriInput" type="text" id="openingHours" name="openingHours" />
          <br />
        </div>

        <div v-show="contributeType === 'recipe'">
          <label for="ingredients">Ingredients:</label>
          <br />
          <textarea class="contriInput" type="text" id="ingre" name="fullName"></textarea>
          <br />

          <label for="instructins">Instructions:</label>
          <br />
          <textarea class="contriInput" type="text" id="ingre" name="fullName"></textarea>
          <br />
        </div>
        <button id="submitContributionButton">Submit!</button>
      </form>
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
      contributeType: "nothing"
    };
  },
  methods: {
    Restaurant: function() {
      this.contributeType = "restaurant";
    },
    Recipe: function() {
      this.contributeType = "recipe";
    }
  }
};
</script>

<style>
.myTitles {
  font-size: 60px;
  margin-bottom: 5px;
  margin-top: 30px;
  text-align: left;
}
.contriInput {
  padding: 10px;
  border-radius: 10px;
  border-color: #ffffff;
  border-style: solid;
  outline: none;
  margin-top: 7px;
  margin-bottom: 20px;
  width: 40%;
}
#submitContributionButton {
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
}
#submitContributionButton:hover {
  border: solid #979797 1px;
  background: #979797;
  -webkit-border-radius: 20px;
  -moz-border-radius: 14px;
  border-radius: 8px;
  text-decoration: none;
}
</style>