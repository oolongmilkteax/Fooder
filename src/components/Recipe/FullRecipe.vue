<template>
  <div class="body">
      <div class="RecipeborderDiv">
            <div class="FullRecipeContainer">
                <br><br>
                <!--
                <a href='javascript:history.go(-1)'>Back</a>
                -->
                <h2 class="recipeName">{{this.recipeName}}</h2>
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
        </div>
        <a href='javascript:void(0);' v-on:click="visit()" class="backBtn">Back</a>                                                         
        <div class="footerContainer">
            <p class="footerText">Design by JKJR</p>
        </div>
    </div>
</template>

<script>
export default {
    props: ["searchedValue"],
    data() {
        return {
            recipeName: this.$route.params.n,
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
.RecipeborderDiv{
    display: flex;
    flex-direction: column;
    justify-content: left;
    align-items: left;
}
#FullRecipe {
    padding: 20px;
}

#Directions {
    list-style-type: none;
}
a{
    background: #0088cc;
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
.recipeName{
    padding: 10px 10px 10px 20px;
    font-size: 36px;
    font-weight: 600;
    text-transform:capitalize;
    text-align: center;
}
.backBtn{
    text-align: center;
}
</style>