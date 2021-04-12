<template>
  <div class="body">
      <div class="borderDiv">
            <div class="FullRecipeContainer">
                <br><br>
                <!--
                <a href='javascript:history.go(-1)'>Back</a>
                -->
                <p>{{searchedValue}}</p>
                <a href='javascript:void(0);' v-on:click="visit()">Back</a>
                <div id="FullRecipe">
                    <h2>Ingredients</h2>
                    <ul v-for="ingredient in recipeIngredients" v-bind:key="ingredient">
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
            </div>
            <div class="footerContainer">
                <p class="footerText">Design by JKJR</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["searchedValue"],
    data() {
        return {
            recipeIngredients: this.$route.params.i, 
            recipeDirections: this.$route.params.d
        }
    },
    methods: {
        visit: function() {
            if(this.searchedValue == null){
                window.history.back()
            } else {
                this.$router.push({
                    name: "Recipe",
                    params: { searchedValue: this.searchedValue }
                });
            }
        }
    }
}
</script>

<style scoped>
#FullRecipe {
    padding: 20px;
}

#Directions {
    list-style-type: none;
}
a{
    background: red;
    border-radius: 8px;
    color: #ffffff;
    font-family: Helvetica;
    font-size: 20px;
    font-weight: 100;
    padding: 5px;
    border: solid 	#0088cc 1px;
    text-decoration: none;
    padding: 14px 25px;
    margin-left: 20px;
}

a:hover{
    border: solid #979797 1px;
    background: #979797;
    -webkit-border-radius: 20px;
    -moz-border-radius: 14px;
    border-radius: 8px;
    text-decoration: none;
    
} 
</style>