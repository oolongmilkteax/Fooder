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
                            <button id="beginCookingButton" v-on:click="go(recipe.ingredients, recipe.directions);" >Begin Cooking!</button>
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
            recipes: []
        }
    },
    methods: {
        fetchItems: function() {
            
            db.firestore().collection('recipe').get().then(snapshot => {
            snapshot.docs.forEach(doc => {
                    this.recipes.push(doc.data()) 
                })
            })
        },
        go: function(ingredients, directions) {
            this.$router.push({ name: "FullRecipe", params: { i: ingredients, d: directions} })
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
    font-size: 18px;
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
    text-align: center;
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