
<template>
  <div class="body">
    <Cheader></Cheader>
    <div v-if="isLoaded">
      <radar-chart :parsedData="parsedData"></radar-chart>
    </div>
    <div class="preferenceDiv">
      <h3>{{ "Favourite Cuisine: " + this.cuisine }}</h3>
      <h3>{{ "Type of Eater: " + this.type }}</h3>
      <h2 v-if= "type == 'Home Cook'" >Here are some recipes we have for you!</h2>
      <h2 v-if= "type == 'Adventurous Foodie'" >Here are some restaurants we have for you!</h2>
      <h2 v-if= "type == 'Not-So-Picky Eater'" >Here are some recipes and restaurants we have for you!</h2>
    </div>
    <h1>Flexible Items</h1>

    <div class="flex-container">
      <div>1</div>
      <div>2</div>
      <div>3</div> 
      <div>4</div>
    </div>

    <p>All direct children of a flexible container becomes flexible items.</p>

    <div class="flex-container" v-for="(item) in recommendedThings" v-bind:key="item.id">
      <div>{{item.name}}  
        <img v-bind:src="item.image" alt="Food image" />
        <button class="myButton smaller" v-on:click="go(item)">Go!</button></div>
     
    </div>
    
    <div class="container">
    <li class="characteristicslist" v-for="(item) in recommendedThings" v-bind:key="item.id">
      <div class="pointDiv">
        {{item.name}}  
        <img v-bind:src="item.image" alt="Food image" />
        <button class="myButton smaller" v-on:click="go(item)">Go!</button>
      </div>
    </li>
    </div>
    
    
    <div class="preferenceDiv">
      <h2>You may also like the following!</h2>
    </div>
    <div class="container" >
    <li class="characteristicslist" v-for="item in possibleReccomendations" v-bind:key="item.id">
      <div class="pointDiv">
        {{item.name}}
        <img v-bind:src="item.image" alt="Food image" />
        <button class="myButton smaller" v-on:click="go(item)">Go!</button>
      </div>
    </li>
    </div>
    <b-button href="/searchpage" class="gotoSearchPage">Find your own Recipes and Restaurants!</b-button>
    <Cfooter></Cfooter>
  </div>
</template>

<script>
import firebase from "../firebase.js";
var db = firebase.firestore();
import RadarChart from "./RadarChart.js";
import logout from "./logout.js";
export default {
  components: {
    RadarChart
  },
  data() {
    return {
      parsedData: [],
      cuisine: "",
      type: "",
      recommendedThings: [],
      possibleReccomendations:[],
      preferences: [],
      isLoaded: false,
    };
  },
  methods: {
    notFirstLogin: function() {
      firebase
        .firestore()
        .collection("user")
        .doc(this.$store.state.uid)
        .update({ firstLogin: false });
      this.$store.commit("setFirstLogin", false);
    },
    logout: logout,
    typeFinder: function() {
      if (this.preferences[1] > 20 && this.preferences[2] >= 15) {
        this.type = "Adventurous Foodie";
        db.collection("restaurant")
          .orderBy("name")
          .limit(3)
          .get()
          .then(snapshot => {
            snapshot.docs.forEach(doc => {
              this.recommendedThings.push(doc.data());
            });
          });
        
        
        db.collection("recipe")
          .orderBy("name")
          .limit(3)
          .get()
          .then(snapshot => {
            snapshot.docs.forEach(doc => {
              this.possibleReccomendations.push(doc.data());
            });
          });
        
        
      } else if (this.preferences[0] > 20 && this.preferences[3] >= 15) {
        this.type = "Home Cook";
        db.collection("recipe")
          .orderBy("name")
          .limit(3)
          .get()
          .then(snapshot => {
            snapshot.docs.forEach(doc => {
              this.recommendedThings.push(doc.data());
            });
          });

        db.collection("restaurant")
          .orderBy("name")
          .limit(3)
          .get()
          .then(snapshot => {
            snapshot.docs.forEach(doc => {
              this.possibleReccomendations.push(doc.data());
            });
          });

      } else {
        this.type = "Not-So-Picky Eater";
        db.collection("recipe")
          .orderBy("name")
          .limit(2)
          .get()
          .then(snapshot => {
            snapshot.docs.forEach(doc => {
              this.recommendedThings.push(doc.data());
            });
          });
        db.collection("restaurant")
          .orderBy("name")
          .limit(2)
          .get()
          .then(snapshot => {
            snapshot.docs.forEach(doc => {
              this.recommendedThings.push(doc.data());
            });
          });
        db.collection("recipe")
          .orderBy("name","desc")
          .limit(2)
          .get()
          .then(snapshot => {
            snapshot.docs.forEach(doc => {
              this.possibleReccomendations.push(doc.data());
            });
          });
        db.collection("restaurant")
          .orderBy("name","desc")
          .limit(2)
          .get()
          .then(snapshot => {
            snapshot.docs.forEach(doc => {
              this.possibleReccomendations.push(doc.data());
            });
          });
      }
    },
    go: function(item) {
      if (item.address != null) {
        this.goRestaurant(item.websiteLink);
      } else {
        this.goRecipe(item.ingredients, item.directions);
      }
    },
    goRecipe: function(ingredients, directions) {
      this.$router.push({
        name: "FullRecipe",
        params: { i: ingredients, d: directions }
      });
    },
    goRestaurant: function(url) {
      window.open(url);
    }
  },
  created: function() {
    db.collection("user")
      .doc(this.$store.state.uid)
      .get()
      .then(doc => {
        this.preferences = doc.data().preferences;
        if (this.preferences.length == 5) {
          this.cuisine = this.preferences.pop();
          this.parsedData = this.preferences;
        }
        this.isLoaded = true;
        this.typeFinder();
      });
    //this.notFirstLogin();
    window.addEventListener("beforeunload", this.notFirstLogin);
  }
};
</script>

<style>
.preferenceDiv {
  text-align: center;
}
.main {
  display:flex
}
.characteristicslist {
  padding: 5px;
  margin: 10px;
  list-style-type: none; 
  /*
  display:flex;
  */
  /*
  flex-direction: row;
  */
  width:24%;
  /*justify-items
  align-items: center;
  */
  text-align: center;
  
}

.container {
  display:flex;
  flex-direction: row;
  justify-content: center;
  /*
  text-align: center;
  */
  padding: 5px;
  margin: 10px;
  /*margin-left: 60px;
  align-items: center;*/
  
}

.pointDiv {
  flex-direction: column;
  display: flex;
  align-items: center;
}

.gotoSearchPage {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 20%;
}

.smaller {
  width: 40%;
}

.flex-container {
  display: flex;
  background-color: #f1f1f1;
  justify-content: center;
}

.flex-container > div {
  background-color: DodgerBlue;
  color: white;
  width: 300px;
  margin: 10px;
  text-align: center;
  line-height: 75px;
  font-size: 30px;
}
</style>
