<template>
  <div class = "body">
      <div class = "borderDiv">
      <ul class="ul">
            <router-link to="/" class="routes">LandingPage</router-link>
            <router-link to='/contribute' class="routes">Contribute</router-link>
            <router-link to="/favpage" class="routes">favpage</router-link>
            <router-link to='/preferencing' class="routes">Preferencing</router-link>
            <router-link to="/restaurant" class="routes">Restaurant</router-link>
            <router-link to="/searchpage" class="routes">Search Page</router-link>
            <router-link to='/signup' class="routes">Sign Up</router-link>
      </ul>
          <p class="signupHeader">Welcome to Fooder!</p>
        <input type="text" class="signupInput" placeholder="First Name">
        <input type="text" class="signupInput" placeholder="Last Name">
        <input type="text" class="signupInput" placeholder="Email">
        <input type="text" class="signupInput" placeholder="Phone Number">
        <input type="text" class="signupInput" placeholder="Company Name">
        <input type="text" class="signupInput" placeholder="Job Title">
        <input type="password" class="signupInput" placeholder="Password">
        <div class="button-centraliser">
          <button class="signupButton" onclick="location.href='./Preference.html'">C R E A T E</button>
        </div>
      </div>
      <div class="footerContainer">
          <p class="footerText">Design by JKJR</p>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>




.signupInput {
    padding: 5px;
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
  
  
  .signupButton {
    background: #0088cc;
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    border-radius: 8px;
    color: #ffffff;
    font-family: Helvetica;
    font-size: 28px;
    font-weight: 100;
    margin: 50px 0px 5px 0px;
    border: solid #666666 1px;
    text-decoration: none;
    display: inline-block;
    cursor: pointer;
    text-align: center;
    width: 30%;
    padding: 10px;
  }
  
  .signupButton:hover {
    border: solid #979797 1px;
    background: #979797;
    -webkit-border-radius: 20px;
    -moz-border-radius: 14px;
    border-radius: 8px;
    text-decoration: none;
  }



.ul{
  display: flex;
  flex-direction: row;
}

.routes {
  display: block;
  max-width: 100%;
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}

.signupHeader{
  font-family: Helvetica;
  color: black;
  font-size: 32px;
  text-align: center;
}
</style>