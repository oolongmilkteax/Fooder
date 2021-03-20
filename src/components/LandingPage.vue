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
            <h1 class="signinHeader">Sign In to Fooder</h1>
            <input type="text" class="signinInput" placeholder="username" />
            <input type="text" class="signinInput" placeholder="password" />
            <div class="button-centraliser">
              <button class="myButton" onclick="location.href='./SearchPage.html'">
              Sign In!
              </button>
            </div>
            <h3 class="member">Not a member yet?</h3>
            <div class="button-centraliser">
              <button class="myButton" onclick="location.href='./SignUp.html'">Sign Up!</button>
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

.myButton {
  background: #0088cc;
  -webkit-border-radius: 20px;
  -moz-border-radius: 20px;
  border-radius: 8px;
  color: #ffffff;
  font-family: Helvetica;
  font-size: 30px;
  font-weight: 100;
  padding: 14px;
  border: solid #0088cc 1px;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
  text-align: center;
  margin: 20px 10px 20px 10px;
  width: 50%;
}


.body {
  background-color: #eeeeee;
  color: #666666;
  font-family: Helvetica;
  position:fixed;
  overflow-y:scroll;
  overflow-x:hidden;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;


}
.button-centraliser {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 20px;
}

h1 {
    font-family: Helvetica;
    text-align: center;
    color: black;
}
.member{
    text-align: center;
    color: #666666;
}

.footerContainer {
  text-align: center;
  width:100%;
  position: static;
  bottom: 0px;
  padding-top: 50px;
  padding-bottom: 50px;
}

.footerText {
  font-family: Helvetica;
  font-size: 10px;
  color: black;
}


.signinInput {
    display:block;
    padding: 10px;
    border-radius: 30px;
    border-color: #ffffff;
    border-style: solid;
    outline: none;
    margin: 5px 0px 5px 0px;
    width: 40%;
    display: block;
    margin-left: auto;
    margin-right: auto; 
    font-size: 20px;
} 

</style>