<template>
  <div class="body">
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="/">Fooder</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item href="/">Sign in</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <div class="SignUpDiv">
      <p class="signupHeader">Welcome to Fooder!</p>
      <input type="text" class="signupInput" v-model="displayName" placeholder="Full Name" />
      <p class="errorMsg" v-show="this.emptyNameErr">Pease enter your full name.</p>
      <input type="text" class="signupInput" v-model="email" placeholder="Email" />
      <p class="errorMsg" v-show="this.invalidEmailErr">Pease enter a valid email address.</p>
      <p class="errorMsg" v-show="this.usedEmailErr">This email is already in use.</p>
      <input type="password" class="signupInput" v-model="password" placeholder="Password" />
      <p class="errorMsg" v-show="this.emptyPasswordErr">Pease enter a password.</p>
      <p class="errorMsg" v-show="this.weakPasswordErr">Pease enter a stronger password.</p>
      <div class="button-centraliser">
        <button class="signupButton" v-on:click="registerUser()">C R E A T E</button>
      </div>
    </div>
    <div class="bottomFooter">
          <Cfooter></Cfooter>
    </div>
  </div>
</template>

<script>
import firebase from "./firebase.js";
import { makeUser, getUid } from "./userObj.js";

export default {
  data() {
    return {
      emptyNameErr: false,
      invalidEmailErr: false,
      usedEmailErr: false,
      emptyPasswordErr: false,
      weakPasswordErr: false,
      displayName: "",
      email: "",
      password: ""
    };
  },
  methods: {
    titleCase: function(string) {
      string.trim();
      var sentence = string.toLowerCase().split(" ");
      for (var i = 0; i < sentence.length; i++) {
        sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
      }
      return sentence.join(" ");
    },
    registerUser: function() {
      if (this.displayName === "") {
        this.emptyNameErr = true;
      }
      if (this.email === "") {
        this.invalidEmailErr = true;
      }
      if (this.password === "") {
        this.emptyPasswordErr = true;
      } else {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then(res => {
            res.user.sendEmailVerification();
            makeUser(getUid());
            firebase
              .firestore()
              .collection("user")
              .doc(getUid())
              .update({
                name: this.titleCase(this.displayName),
                firstLogin: true,
                donePreferencing: false
              });
            alert(
              "Registered successfully. Please verify email before signing in."
            );
            // somehow without the timeout, the userobj doesnt get created in the firebase
            setTimeout(function() {
              location.href = "./";
            }, 1000);
          })
          .catch(error => {
            if (error.code === "auth/invalid-email") {
              this.invalidEmailErr = true;
            }
            if (error.code === "auth/weak-password") {
              this.weakPasswordErr = true;
            }
            if (error.code === "auth/email-already-in-use") {
              this.usedEmailErr = true;
            }
          });
      }
    }
  },
  watch: {
    displayName: function() {
      this.emptyNameErr = false;
    },
    email: function() {
      this.invalidEmailErr = false;
      this.usedEmailErr = false;
    },
    password: function() {
      this.emptyPasswordErr = false;
      this.weakPasswordErr = false;
    }
  }
};
</script>

<style>
.SignUpDiv{
  padding: 5%;
}
.bottomFooter{
  position: absolute;
  bottom:0px;
  width:100%
}
.errorMsg {
  text-align: left;
  margin-left: 30%;
  color: red;
}

.signupInput {
  padding: 5px;
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

.signupButton {
  background: #0088cc;
  -webkit-border-radius: 20px;
  -moz-border-radius: 20px;
  border-radius: 8px;
  color: #ffffff;
  font-family: Helvetica;
  font-size: 28px;
  font-weight: 100;
  margin: 20px 0px 5px 0px;
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

.ul {
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

.signupHeader {
  font-family: Helvetica;
  color: black;
  font-size: 32px;
  text-align: center;
}
</style>