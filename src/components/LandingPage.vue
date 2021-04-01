<template>
  <div class="body">
    <ul class="ul">
      <router-link to="/" class="routes">Sign In</router-link>
      <router-link to="/signup" class="routes">Sign Up</router-link>
    </ul>
    <div class="borderDiv">
      <h1 class="signinHeader">Sign In to Fooder</h1>
      <input
        type="text"
        class="signinInput"
        v-model="email"
        placeholder="email"
      />
      <input
        type="text"
        class="signinInput"
        v-model="password"
        placeholder="password"
      />
      <div class="button-centraliser">
        <button class="myButton" v-on:click="userLogin()">Sign In!</button>
        <p v-show="this.showErrMsg" class="errMsg">
          Invalid email / password. Please try again.
        </p>
        <p v-show="this.verifyEmail" class="errMsg">
          Please verify email before signing in.
        </p>
      </div>
      <h3 class="member">Not a member yet?</h3>
      <div class="button-centraliser">
        <button class="myButton" onclick="location.href='./signup'">
          Sign Up!
        </button>
      </div>
      <div class="footerContainer">
        <p class="footerText">Design by JKJR</p>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "../firebase.js";

export default {
  data() {
    return {
      showErrMsg: false,
      verifyEmail: false,
      email: "",
      password: "",
    };
  },
  methods: {
    userLogin: function() {
      if (this.email === "" && this.password === "") {
        this.showErrMsg = true;
      } else {
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(() => {
            this.$store.commit("setAuthentication", true);
            this.$router.replace({ name: "Contribute" });
            //location.href = "./preferencing";
            /*
            if (res.user.emailVerified) {
              location.href = "./preferencing";
            } else {
              this.verifyEmail = true;
            }
            */
          })
          .catch(() => {
            this.showErrMsg = true;
          });
      }
    },
  },
  watch: {
    email: function() {
      this.showErrMsg = false;
      this.verifyEmail = false;
    },
    password: function() {
      this.showErrMsg = false;
    },
  },
};
</script>

<style>
.errMsg {
  color: red;
  margin: 0 0 0 0;
}

.body {
  background-color: #eeeeee;
  color: #666666;
  font-family: Helvetica;
  position: fixed;
  overflow-y: scroll;
  overflow-x: hidden;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
}
.button-centraliser {
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  font-family: Helvetica;
  text-align: center;
  color: black;
}
.member {
  text-align: center;
  color: #666666;
  margin-top: 50px;
  margin-bottom: 0px;
}

.footerContainer {
  text-align: center;
  width: 100%;
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
  display: block;
  padding: 10px;
  border-radius: 30px;
  border-color: #ffffff;
  border-style: solid;
  outline: none;
  margin: 15px;
  width: 40%;
  display: block;
  margin-left: auto;
  margin-right: auto;
  font-size: 20px;
}
</style>
