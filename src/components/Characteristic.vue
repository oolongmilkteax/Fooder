
<template>
  <div class="body">
    <Cheader></Cheader>
    <div id="radarCont" v-if="isLoaded">
      <radar-chart :parsedData="parsedData"></radar-chart>
    </div>
    <div id="type">
      <p>{{ "Favourite Cuisine: " + this.cuisine }}</p>
      <p>{{ "Type of Eater: " + this.type }}</p>
    </div>

    <div id="recomContainer">
      <h3 v-if="type == 'Home Cook'">Here are some recipes we think you'll love!</h3>
      <h3 v-if="type == 'Adventurous Foodie'">Here are some restaurants we think you'll love!</h3>
      <h3
        v-if="type == 'Not-So-Picky Eater'"
      >Here are some recipes and restaurants we think you'll love!</h3>

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
        <h3>Other suggestions for you to explore:</h3>
      </div>
      <div class="container">
        <li
          class="characteristicslist"
          v-for="item in possibleReccomendations"
          v-bind:key="item.id"
        >
          <div class="pointDiv">
            {{item.name}}
            <img v-bind:src="item.image" alt="Food image" />
            <button class="myButton smaller" v-on:click="go(item)">Go!</button>
          </div>
        </li>
      </div>
    </div>

    <b-button
      href="/searchpage"
      class="gotoSearchPage"
    >Start finding your own Recipes and Restaurants!</b-button>
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
      possibleReccomendations: [],
      preferences: [],
      isLoaded: false
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
          .orderBy("name", "desc")
          .limit(2)
          .get()
          .then(snapshot => {
            snapshot.docs.forEach(doc => {
              this.possibleReccomendations.push(doc.data());
            });
          });
        db.collection("restaurant")
          .orderBy("name", "desc")
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
#radarCont {
  margin-top: 20px;
}

#type {
  text-align: center;
  margin-top: 20px;
  font-size: 23px;
}

#type p {
  margin-bottom: 0px;
}

#recomContainer {
  text-align: center;
  margin-top: 40px;
}

.preferenceDiv {
  margin-top: 40px;
}

.main {
  display: flex;
}
.characteristicslist {
  padding: 5px;
  margin: 10px;
  list-style-type: none;
  width: 24%;
  text-align: center;
}

.container {
  display: flex;
  justify-content: center;
}

.pointDiv {
  align-items: center;
}

.gotoSearchPage {
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;
  width: 23%;
  height: 48px;
  font-size: 22px;
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
