<template>
  <div class="body">
    <Cheader></Cheader>
    <div class="DashDiv">
      <PulseLoader id="loading" :loading="isLoading_1 || isLoading_2"></PulseLoader>
      <div v-if="isLoaded_1 && isLoaded_2">
        <radar-chart :parsedData="parsedData"></radar-chart>
        <favChart :data="chart1"></favChart>
        <div class="pieDiv">
          <DifficultyChart
            :data="difficultyCount"
            class="pie"
          ></DifficultyChart>

          <PRChart
            :data="priceCount"
            class="pie"
          ></PRChart>
        </div>
        <h3
          class="cuisine"
          v-if="tooLittleDataA == true && tooLittleDataB == false"
        >Please favourite more recipes to generate more insight.
        </h3>
        <h3
          class="cuisine"
          v-if="tooLittleDataB == true && tooLittleDataB == false"
        >Please favourite more restaurants to generate more insight.
        </h3>
        <h3 class="cuisine"
        v-if="tooLittleDataA == true && tooLittleDataB == true">
          Please favourite more restaurants and recipes to generate more insight.
        </h3>
        <h3 class="cuisine">{{ "Favourite Cuisine: " + this.cuisine }}</h3>
      </div>
    </div>
    <Cfooter></Cfooter>
  </div>
</template>

<script>
import firebase from "../firebase.js";
import logout from "./logout.js";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import RadarChart from "./RadarChart.js";
import favChart from "./NumberOfFavConChart.js";
import DifficultyChart from "./DifficultyChart";
import PRChart from "./PriceRangeChart";

var db = firebase.firestore();
export default {
  components: {
    PulseLoader,
    RadarChart,
    favChart,
    DifficultyChart,
    PRChart
  },
  data() {
    return {
      isLoaded_1: false,
      isLoaded_2: false,
      isLoading_1: true,
      isLoading_2: true,

      cuisine: "",
      parsedData: [],
      chart1: [0, 0, 0, 0],
      recipes: [],
      restaurants: [],
      price: [],
      difficulty: [],
      priceCount: [0, 0, 0, 0, 0, 0, 0],
      difficultyCount: [0, 0, 0],
      priceCounts: [],
      difficultyCounts: [],
      tooLittleDataA: false,
      tooLittleDataB: false
    };
  },
  methods: {
    // trying something
    fetchInfo: function() {
      db.collection("user")
        .doc(this.$store.state.uid)
        .get()
        .then(doc => {
          this.preferences = doc.data().preferences;
          if (this.preferences.length == 5) {
            this.cuisine = this.preferences.pop();
            this.parsedData = this.preferences;
          }
          this.chart1[0] = doc.data().contributeRecipe.length;
          this.chart1[1] = doc.data().favRecipe.length;
          this.chart1[2] = doc.data().contributeRestaurant.length;
          this.chart1[3] = doc.data().favRestaurant.length;
          this.difficulty = doc.data().favRecipe;
          this.price = doc.data().favRestaurant;
          this.getDifficulty();
          this.getPrice();
        });
    },

    logout: logout,

    getDifficulty: function() {
      if (this.difficulty.length < 4) {
        this.tooLittleDataA = true;
      }
      db.collection("recipe")
        .get({ source: "cache" })
        .then(snapshot => {
          snapshot.docs.forEach(doc => {
            if (this.difficulty.includes(doc.id)) {
              var diff = doc.data().difficulty;
              if (diff == "Easy") {
                this.difficultyCount[0] += 1;
              } else if (diff == "Medium") {
                this.difficultyCount[1] += 1;
              } else {
                this.difficultyCount[2] += 1;
              }
            }
          });
          console.log("difficulty count: " + this.difficultyCount);
          db.collection("user")
            .doc(this.$store.state.uid)
            .update({
              chartDiff: this.difficultyCount
            });
          this.isLoaded_1 = true;
          this.isLoading_1 = false;
        });
    },

    getPrice: function() {
      if (this.price.length < 4) {
        this.tooLittleDataB = true;
      }
      db.collection("restaurant")
        .get({ source: "cache" })
        .then(snapshot => {
          snapshot.docs.forEach(doc => {
            if (this.price.includes(doc.id)) {
              var px = doc.data().priceRange;
              if (px == "less than $20") {
                this.priceCount[0] += 1;
              } else if (px == "$20 to $50") {
                this.priceCount[1] += 1;
              } else if (px == "$50 to $100") {
                this.priceCount[2] += 1;
              } else if (px == "$100 to $150") {
                this.priceCount[3] += 1;
              } else if (px == "$150 to $200") {
                this.priceCount[4] += 1;
              } else if (px == "$200 to $300") {
                this.priceCount[5] += 1;
              } else {
                this.priceCount[6] += 1;
              }
            }
          });
          console.log("price count: " + this.priceCount);
          db.collection("user")
            .doc(this.$store.state.uid)
            .update({
              chartPX: this.priceCount
            });
          this.isLoaded_2 = true;
          this.isLoading_2 = false;
        });
    }
  },
  created: async function() {
    this.fetchInfo();
  }
};
</script>

<style>
.pieDiv {
  display: flex;
  flex-direction: row;
  width: 100%;
}
.cuisine {
  height: 10em;
  display: flex;
  justify-content: center;
  align-items: center;
}
.pie {
  width: 50%;
}
</style>