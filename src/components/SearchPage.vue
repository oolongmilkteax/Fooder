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
    <div class="borderDiv">
      <p class="searchHeader">Fooder</p>
      <input type="text" class="searchInput" placeholder="Search for Restaurants or Recipes!" />
      <div class="button-centraliser">
        <button class="myButton" onclick="location.href='./SearchResults.html'">Search</button>
      </div>
      <div class="footerContainer">
        <p class="footerText">Design by JKJR</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
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