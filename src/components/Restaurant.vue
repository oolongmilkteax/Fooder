<template>
  <div class = "body">
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
      <div class = "borderDiv">
            <div id="restaurantInfo">
            <div class="RestaurantContainer">
                <h1 class="myTitles">Fong Seng Nasi Lemak</h1>
                <hr />
                <p>Address: 22 Clementi Rd, Singapore 129751</p>

                <p>Opening Hours: 6am-4am (closed on Tuesdays)</p>

                <p>Phone: +65 9092 1651</p>
                <hr />

                <p>
                An institution in itself, Fong Seng Nasi Lemak in Clementi is a
                godsend for night owls as it operates till 4.00AM every day. They
                offer the standard coconut-infused rice as well as trays upon trays of
                fried and saucy ingredients. Think, your standard fried fish, chicken
                wings, otah, ikan bilis, fried egg as well as slightly more
                unconventional options such as luncheon meat, hash browns, chicken
                cutlet, fish cake, teriyaki saba fish and more. <br /><br />
                To better accommodate students and to keep one step ahead of their
                competitors, they maintain relatively affordable prices!  
                </p>
                <img
                class="sampleImg"
                src="https://sg.everydayonsales.com/news/wp-content/uploads/2020/09/Fong-Seng-Nasi-Lemak2-768x577.jpg"
                />

                <img
                class="sampleImg"
                src="https://images.squarespace-cdn.com/content/v1/5be6dd00f79392e09d2d579d/1542729826903-RQAJMFVXRGSZSARR6S7Y/ke17ZwdGBToddI8pDm48kDHPSfPanjkWqhH6pl6g5ph7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0mwONMR1ELp49Lyc52iWr5dNb1QJw9casjKdtTg1_-y4jz4ptJBmI9gQmbjSQnNGng/Fong+Seng+Nasi+Lemak+Singapore+%28Clementi%29?format=750w"
                />

            </div>
            </div>
            <div class="button-centraliser">
              <button
                id="letsGoButton"
                onclick="window.open('https://www.google.com/maps/dir//22+Clementi+Rd,+Fong+Seng+Nasi+Lemak,+Singapore+129751/@1.2840326,103.77301,15z/data=!4m8!4m7!1m0!1m5!1m1!1s0x31da1afc181c2619:0x14776d7d674529e1!2m2!1d103.7686889!2d1.2929497')"
                >
                Lets Go!
              </button>
            </div>
            <div class="footerContainer">
      <p class="footerText">Design by JKJR</p>
    </div>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.RestaurantContainer{
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
  
  #letsGoButton{
    background: #0088cc;
    width: 20%;
    border-radius: 8px;
    border-radius: 8px;
    color: 	white;
    font-family: Helvetica;
    font-size: 32px;
    font-weight: 100;
    padding: 14px;
    border: solid #0088cc 1px;
    margin-top: 30px;
    margin-right: 20px;
  }
  
  #letsGoButton:hover{
    border: solid #979797 1px;
    background: #979797;
    -webkit-border-radius: 20px;
    -moz-border-radius: 14px;
    border-radius: 8px;
    text-decoration: none;
  }


</style>