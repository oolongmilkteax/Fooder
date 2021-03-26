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
      </form>
      <div class="footerContainer">
        <p class="footerText">Design by JKJR</p>
      </div>
    </div>
  </div>
</template>

<script>
//import db from "../firebase.js";
import firebase from '../firebase.js'
var db = firebase.firestore()
import {getUid} from '../userObj.js'



export default {
  data() {
    return {
      contributeType: "nothing",
      recipe: {
        cuisine: "",
        difficulty: "",
        directions: [],
        image: "",
        ingredients: [],
        name: "",
        servings: "",
        time: "",
        type: ""
      },
      ingredient: "",
      instruction: "",
      id: ""
    };
  },
  methods: {
    Restaurant: function() {
      this.contributeType = "restaurant";
    },
    Recipe: function() {
      this.contributeType = "recipe";
    },
    addIngre: function() {
      this.recipe.ingredients.push(this.ingredient)
      this.ingredient = ""
    },
    addInstru: function() {
      this.recipe.directions.push(this.instruction)
      this.instruction = ""
    },
    removeIngre: function() {
      this.recipe.ingredients = []
    },
    removeInstru: function() {
      this.recipe.directions = []
    },
    submitRecipe: function() {
      db.collection('recipe').add(this.recipe)
      .then( (doc) => {
        this.id = doc.id;
        db.collection('user').doc(getUid()).update({
          "contributeRecipe": firebase.firestore.FieldValue.arrayUnion(this.id)
        })
      })
      alert(this.recipe.name + " has been successfully added to Recipes!")
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
</style>