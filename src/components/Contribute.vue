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

          <label for="restAddress">Restaurant Address:</label><br>
            <input
            class="contriInput"
            type="text"
            id="restAddress"
            name="restAddress"
            v-model="restAddress"
            ><br>


            <p class="errorMsgs" v-show="this.missingRestAddress">Please enter the restaurant's address</p>

            <label for="restCuisine">Cuisine:</label><br>
            <input
            class="contriInput"
            type="text"
            id="restCuisine"
            name="restCuisine"
            v-model="restCuisine"
            ><br>

            <p class="errorMsgs" v-show="this.missingRestCuisine">Please enter the restaurant's cuisine</p>

            <label for="imageLink">Image:</label><br>
            <input
            class="contriInput"
            type="text"
            id="imageLink"
            name="imageLink"
            v-model="imageLink" placeholder="Please provide a valid link"
            ><br>

            <p class="errorMsgs" v-show="this.missingImageLink">Please submit an image of the restaurant</p>

            <label for="restName">Restaurant Name:</label><br>
            <input
            class="contriInput"
            type="text"
            id="restName2"
            name="restName"
            v-model="restName"
            ><br>

            <p class="errorMsgs" v-show="this.missingRestName">Please enter the name of the restaurant</p>

            <label for="openingHours">Opening hours:</label><br>
            <input
            class="contriInput"
            type="text"
            id="openingHours"
            name="openingHours"
            v-model="openingHours" placeholder="eg 11:30am–2:30pm, 5:30pm–10:30pm"
            ><br>

            <p class="errorMsgs" v-show="this.missingOpeningHours">Please state the time periods that the restaurant will be open for</p>

            <label for="priceRange">Price range:</label><br>
            <input
            class="contriInput"
            type="text"
            id="priceRange"
            name="priceRange"
            v-model="priceRange" placeholder="eg $15–$35"
            ><br>

            <p class="errorMsgs" v-show="this.missingPriceRange">Please kindly estimate how much a meal would cost at this restaurant</p>

            <label for="websiteLink">Website:</label><br>
            <input
            class="contriInput"
            type="text"
            id="websiteLink"
            name="websiteLink"
            v-model="websiteLink"
            ><br>

            <p class="errorMsgs" v-show="this.missingWebsiteLink">Please enter the restaurant's website</p>
        </div>

        <div v-show="contributeType === 'recipe'">
          <label for="recipeName">Name of Recipe: </label>
          <span>{{recipe.name}}</span>

          <br />
          <input class="contriInput" 
          type="text" 
          id="recipeName" 
          name="recipeName" 
          v-model="recipe.name" 
          required/>
          <br />

          <label for="cuisine">Cuisine: </label>
          <span>{{recipe.cuisine}}</span>
          <br />

          <input class="contriInput" 
          type="text" 
          id="cuisine" 
          name="cuisine" 
          v-model="recipe.cuisine" 
          required/>
          <br />

          <label for="difficulty">Difficulty: </label> 
          <span>{{recipe.difficulty}}</span>
          <br />

          <select class="contriInput" 
          id="difficulty" 
          name="difficulty" 
          v-model="recipe.difficulty" 
          required>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
          <br />

          <label for="image">ImageURL: </label> 
          <br />
          <input class="contriInput" 
          type="text" 
          id="image" 
          name="image" 
          v-model="recipe.image" 
          required/>
          <br />

          <label for="serving">No. of servings: </label> 
          <span>{{recipe.servings}}</span>
          <br />

          <select class="contriInput" 
          id="serving" 
          name="serving" 
          v-model="recipe.servings" 
          required>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value=">10"> more than 10</option>
          </select>
          <br />

          <label for="time">Duration to make: </label> 
          <span>{{recipe.time}}</span>
          <br />
          <select class="contriInput" 
          id="time" 
          name="time" 
          v-model="recipe.time" 
          required>
            <option value="less than 30mins">less than 30mins</option>
            <option value="30mins to 1h">30mins to 1h</option>
            <option value="1h to 2h">1h to 2h</option>
            <option value="2h to 3h">2h to 3h</option>
            <option value="3h to 4h">3h to 4h</option>
            <option value="4h to 5h">4h to 5h</option>
            <option value="5h to 6h">5h to 6h</option>
            <option value="6h to 7h">6h to 7h</option>
            <option value="7h to 8h">7h to 8h</option>
            <option value="8h to 9h">8h to 9h</option>
            <option value="9h to 10h">9h to 10h</option>
            <option value="more than 10h">more than 10h</option>
          </select>
          <br />

          <label for="type">Type: </label> 
          <span>{{recipe.type}}</span>
          <br />
      
          <select class="contriInput" 
          id="type" 
          name="type" 
          v-model="recipe.type" 
          required>
            <option value="Main">Main</option>
            <option value="Side">Side</option>
          </select>
          <br />

          <label for="ingredients">Ingredients: </label>
          <button type="button" v-on:click="removeIngre">Clear All</button>

          <div>
            <ul v-for="ingredient in recipe.ingredients" v-bind:key="ingredient">
              <li>
                <span>{{ingredient}}</span> 
              </li> 
            </ul>
          </div>
          <br />

          <input class="contriInput" 
          type="text" id="ingredients" 
          name="ingredients" 
          v-model="ingredient"/>
          <button type="button" v-on:click="addIngre">Add Ingredient!</button>
          
          <br />
          <label for="instructions">Instructions: </label>
          <button type="button" v-on:click="removeInstru">Clear All</button>

          <div>
            <ul v-for="instruction in recipe.directions" v-bind:key="instruction">
              <li>
                <span>{{instruction}}</span> 
              </li>
            </ul>
          </div>
          <br />

          <input class="contriInput" 
          type="text" 
          id="instructions" 
          name="instructions" 
          v-model="instruction"/>
          <button type="button" v-on:click="addInstru">Add Instruction!</button>
          <br />

          <button type="button" id="submitRecipeButton" v-on:click="submitRecipe">Submit!</button>
        </div>

        <button id="submitContributionButton" type="button" v-on:click="addRestaurant(); addContribution()">Submit!</button>

      </form>
      <div class="footerContainer">
        <p class="footerText">Design by JKJR</p>
      </div>
    </div>
  </div>
</template>

<script>

import firebase from "../firebase.js"
var db = firebase.firestore()
import {getUid} from "../userObj.js"

export default {
  data() {
    return {

      contributeType: "nothing", 
      missingRestAddress: false,
      missingRestCuisine: false,
      missingImageLink: false,
      missingRestName: false,
      missingOpeningHours: false,
      missingPriceRange: false,
      missingWebsiteLink: false,
      restAddress: "",
      restCuisine: "",
      imageLink: "",
      restName: "",
      openingHours: "",
      priceRange: "",
      websiteLink: "",
      allFilled: true,
      size: 0

    };
  },
  methods: {
    Restaurant: function() {
      this.contributeType = "restaurant";
    },
    Recipe: function() {
      this.contributeType = "recipe";
    },

    addRestaurant: function(){

      if (this.restAddress === "") {
          this.missingRestAddress = true;
          this.allFilled = false;
      } else {
          this.missingRestAddress = false;
          this.allFilled = true;
      }

      if (this.restCuisine === "") {
          this.missingRestCuisine = true;
          this.allFilled = false;
      } else {
          this.missingRestCuisine = false;
          this.allFilled = true;
      }

      if (this.imageLink === "") {
          this.missingImageLink = true;
          this.allFilled = false;
      } else {
          this.missingImageLink = false;
          this.allFilled = true;
      }

      if (this.restName === "") {
          this.missingRestName = true;
          this.allFilled = false;
      } else {
          this.missingRestName = false;
          this.allFilled = true;
      }

      if (this.openingHours === "") {
          this.missingOpeningHours = true;
          this.allFilled = false;
      } else {
          this.missingOpeningHours = false;
          this.allFilled = true;
      }

      if (this.priceRange === "") {
          this.missingPriceRange = true;
          this.allFilled = false;
      } else {
          this.missingPriceRange = false;
          this.allFilled = true;
      }
      /*
      if (this.websiteLink === "") {
          this.missingWebsiteLink = true;
          this.allFilled = false;
      } else {
          this.missingWebsiteLink = false;
          this.allFilled = true;
      }
      */

      if (this.allFilled == true) {
        var newId = (this.size+1).toString();
        db.collection('restaurant').doc(newId).set({
            address: this.restAddress,
            cuisine: this.restCuisine,
            image: this.imageLink,
            name: this.restName,
            openingHours: this.openingHours,
            priceRange: this.priceRange,
            websiteLink: this.websiteLink
        }).then(() => {location.reload()});  

        //db.collection("restaurant").doc("21").delete()
      }
    },
    addContribution: function() {
    
        if(this.allFilled==true) {
          var docRef = db.collection('restaurant').doc((this.size+1).toString());
          
          db.collection('user').doc(getUid()).update({
            contributeRestaurant: firebase.firestore.FieldValue.arrayUnion(docRef)
          }).then(() => {location.reload()});  
        }

    }             
  },
  created() {
    db.collection('restaurant').get().then(snap => {
        this.size = snap.size; 
    });

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

#submitRecipeButton {
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

#submitRecipeButton:hover {
  border: solid #979797 1px;
  background: #979797;
  -webkit-border-radius: 20px;
  -moz-border-radius: 14px;
  border-radius: 8px;
  text-decoration: none;
}

.errorMsgs {
  text-align: left;
  color: red;
}

</style>