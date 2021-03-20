<template>
  <div class="body">
    <ul class="ul">
            <router-link to="/" class="routes">LandingPage</router-link>
            <router-link to='/contribute' class="routes">Contribute</router-link>
            <router-link to="/favpage" class="routes">favpage</router-link>
            <router-link to="/recipe" class="routes">Recipe</router-link>
            <router-link to='/preferencing' class="routes">Preferencing</router-link>
            <router-link to="/restaurant" class="routes">Restaurant</router-link>
            <router-link to="/searchpage" class="routes">Search Page</router-link>
            <router-link to='/signup' class="routes">Sign Up</router-link>
    </ul>
      <div class="borderDiv">
            <div class="RecipeContainer">
                <div id="Recipe">
                    <div id="FullRecipe" v-show="show">
                        <h2>Ingredients</h2>
                        <ul v-for="(ingredient) in recipeIngredients" v-bind:key="index">
                            <li>
                                <span>{{ingredient}}</span> 
                            </li>
                        </ul>
                        <h2>Steps</h2>
                        <ul id="Directions" v-for="(direction, index) in recipeDirections" v-bind:key="index">
                            <li>
                                <span>{{index+1}}) {{direction}}</span> 
                            </li>
                        </ul>
                    </div>
                    <ul id="BriefDescription">
                        <li id="list" v-for="recipe in recipes" v-bind:key="recipe">
                            <h2>{{recipe.name}}</h2>
                            <img v-bind:src="recipe.image" alt = "Food image"><br><br><br>
                            <div id = "Description">
                            <span>Total preparation time: {{recipe.time}}</span><br>
                            <span>Number of servings: {{recipe.servings}}</span><br>
                            <span>Difficulty: {{recipe.difficulty}}</span><br>
                            <span>Cuisine: {{recipe.cuisine}}</span><br>
                            <span>Type: {{recipe.type}}</span>
                            </div>
                            <button id="beginCookingButton" v-on:click="reveal(recipe)">Begin Cooking!</button>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="footerContainer">
                <p class="footerText">Design by JKJR</p>
            </div>
        </div>
    </div>
</template>

<script>
import db from "../firebase.js"
export default {
    data() {
        return {
            recipes: [],
            recipeIngredients: [],
            recipeDirections: [],
            show : false
        }
    },
    methods: {
        fetchItems: function() {
            db.collection('recipe').get().then(snapshot => {
            snapshot.docs.forEach(doc => {
            this.recipes.push(doc.data()) 
            })
            })
        },
        reveal: function(recipe) {
            this.show = true;
            this.recipeIngredients= recipe.ingredients;
            this.recipeDirections= recipe.directions;
        }
    },
    created() {
        this.fetchItems()
    }
}
</script>

<style scoped>
.RecipeContainer {
    width: 100%;
    padding-right: 20px;
}

#BriefDescription {
    display: flex;
    flex-wrap: wrap;
    list-style-type: none;
    line-height: 5px;
}

#beginCookingButton{
    background: 	#0088cc;
    width: 150px;
    border-radius: 8px;
    color: #ffffff;
    font-family: Helvetica;
    font-size: 10px;
    font-weight: 100;
    padding: 5px;
    border: solid 	#0088cc 1px;
}

#beginCookingButton:hover{
    border: solid #979797 1px;
    background: #979797;
    -webkit-border-radius: 20px;
    -moz-border-radius: 14px;
    border-radius: 8px;
    text-decoration: none;
    
} 
#Description {
    line-height: 20px;
    text-align: left;
    padding: 5px 80px;
}

#list {
    flex-grow: 1;
    flex-basis: 300px;
    text-align: center;
    padding: 5px;
    border: 1px solid #222;
    margin: 10px;
}
img{
  width:100px;
  height: 100px;
}

h2, img {
  padding-right: 20px;
}

#FullRecipe {
    padding: 10px;
}

#Directions {
    list-style-type: none;
}
</style>