<template>
  <div class="body">
    <ul class="ul">
            <router-link to="/" class="routes">LandingPage</router-link>
            <router-link to='/contribute' class="routes">Contribute</router-link>
            <router-link to="/favpage" class="routes">favpage</router-link>
            <router-link to="/ingredients" class="routes">Ingredients</router-link>
            <router-link to='/preferencing' class="routes">Preferencing</router-link>
            <router-link to="/restaurant" class="routes">Restaurant</router-link>
            <router-link to="/searchpage" class="routes">Search Page</router-link>
            <router-link to='/signup' class="routes">Sign Up</router-link>
    </ul>
      <div class="borderDiv">
            <div class="IngredientContainer">
                <div id="Ingredients">
                <h1 class="myTitles">Traditional Nasi Lemak</h1>
                <hr />
                <p>Serving Size: 4 pax</p>
                <p>Preparation time: 30 minutes</p>
                <p>Cooking time: 30 minutes</p>
                <p>Total time: 1 hour</p>
                <br />

                <h2>Ingredients:</h2>
                <h4>Coconut milk rice:</h4>
                <div class="subIngredients">
                <p>3 cups jasmine rice or any white long-grain rice</p>
                <p>1/2 cup coconut cream (thick coconut milk)</p>
                <p>3 cups water</p>
                <p>2 pandan leaves (screwpine leaves-knotted)</p>
                <p>1 stalk lemongrass (bruised)</p>
                </div>
                <h3>Fried anchovies and peanuts:</h3>
                <div class="subIngredients">
                <p>2 tsp cooking oil</p>
                <p>1 cup dried anchovies</p>
                <p>1 cup dry roasted peanuts</p>
                <p>Pinch of sugar</p>
                </div>
                <h3>Garnish:</h3>
                <div class="subIngredients">
                <p>1 small cucumber (washed and thinly sliced)</p>
                </div>

                <button
                id="beginCookingButton"
                onclick="location.href= './InstructionsSample.html';"
                >
                Begin Cooking!
                </button>
            </div>
            <div class="footerContainer">
                <p class="footerText">Design by JKJR</p>
            </div>
            </div>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

.IngredientContainer{
  padding-left: 5%;
}



.myTitles {
    font-size: 60px;
    margin-bottom: 5px;
    margin-top: 30px;
}

.sampleImg {
    width: 49%;
    margin-top: 30px;
}

hr {
    margin-bottom: 30px;
    margin-top: 30px;
    width: 100%;
    background-color: white;
}

.subIngredients,
.subInstructions {
    margin-left: 20px;
}

#beginCookingButton{
    background: 	#0088cc;
    width: 20%;
    border-radius: 8px;
    border-radius: 8px;
    color: #ffffff;
    font-family: Helvetica;
    font-size: 28px;
    font-weight: 100;
    padding: 14px;
    border: solid 	#0088cc 1px;
    margin-top: 30px;
    margin-right: 20px;
}

#beginCookingButton:hover{
    border: solid #979797 1px;
    background: #979797;
    -webkit-border-radius: 20px;
    -moz-border-radius: 14px;
    border-radius: 8px;
    text-decoration: none;
} 



</style>