<template>
  <div class="body">
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="/searchpage">Fooder</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item href="/searchpage">Search</b-nav-item>
          <b-nav-item href="/contribute">Contribute</b-nav-item>
          <b-nav-item href="/favpage">favourites</b-nav-item>
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              User
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <ul class="ul">
      <router-link to="/contribute" class="routes">Contribute</router-link>
      <router-link to="/favpage" class="routes">favpage</router-link>
      <router-link to="/recipe" class="routes">Recipe</router-link>
      <router-link to="/preferencing" class="routes">Preferencing</router-link>
      <router-link to="/restaurant" class="routes">Restaurant</router-link>
      <router-link to="/searchpage" class="routes">Search Page</router-link>
      <router-link @click.native="logout" to="/" class="routes"
        >Logout</router-link
      >
      <router-link to="/profile" class="routes">Profile</router-link>
      <router-link to="/characteristic" class="routes"
        >Characteristic</router-link
      >
      <router-link to="/profileresults" class="routes"
        >ProfileSearch</router-link
      >
    </ul>
    <div id="block_container">
      <div id="bloc1">
        <button class="sortFilterButton" v-on:click="submit = !submit">
          Sort By:</button
        ><br />

        <select v-show="submit" v-model="selected" v-on:change="sort(selected)">
          <option disabled value="">Select option:</option>
          <option value="name">Name</option>
          <option value="cuisine">Cuisine</option>
          <option value="price">Price</option>
        </select>
      </div>

      <div id="bloc2">
        <button class="sortFilterButton" v-on:click="filter = !filter">
          Filter:</button
        ><br />

        <button
          class="filterOpt"
          v-show="filter"
          v-on:click="
            cuisine = !cuisine;
            price = false;
          "
        >
          Cuisine
        </button>
        <button
          class="miniButton"
          v-show="cuisine && filter"
          v-on:click="filterCuisine('Chinese')"
        >
          Chinese
        </button>
        <button
          class="miniButton"
          v-show="cuisine && filter"
          v-on:click="filterCuisine('Western')"
        >
          Western
        </button>
        <button
          class="miniButton"
          v-show="cuisine && filter"
          v-on:click="filterCuisine('Italian')"
        >
          Italian
        </button>
        <button
          class="miniButton"
          v-show="cuisine && filter"
          v-on:click="filterCuisine('Thai')"
        >
          Thai
        </button>
        <button
          class="miniButton"
          v-show="cuisine && filter"
          v-on:click="filterCuisine('Malaysian')"
        >
          Malaysian
        </button>
        <button
          class="miniButton"
          v-show="cuisine && filter"
          v-on:click="filterCuisine('Singaporean')"
        >
          Singaporean
        </button>
        <button
          class="miniButton"
          v-show="cuisine && filter"
          v-on:click="filterCuisine('Japanese')"
        >
          Japanese
        </button>
        <button
          class="miniButton"
          v-show="cuisine && filter"
          v-on:click="filterCuisine('Mediterranean')"
        >
          Mediterranean</button
        ><br />

        <button
          class="filterOpt"
          v-show="filter"
          v-on:click="
            price = !price;
            cuisine = false;
          "
        >
          Price
        </button>

        <input
          v-show="price && filter"
          v-on:change="test()"
          type="range"
          list="tickmarks"
          min="0"
          max="6"
          value="50"
          class="slider"
          id="myRange"
        />
        <span v-show="price && filter" style="margin-right:15px"
          ><strong> <span id="demo"></span></strong
        ></span>
        <button
          class="miniButton"
          v-show="price && filter"
          v-on:click="filterPrice(priceValue)"
        >
          Submit
        </button>
        <br />
        <br />
      </div>
    </div>
    <div class="borderDiv">
      <PulseLoader id="loading" :loading="isLoading"></PulseLoader>
      <div class="RestaurantContainer">
        <div id="Restaurant">
          <ul id="BriefDescription">
            <li
              id="list"
              v-for="restaurant in restaurants"
              v-bind:key="restaurant"
            >
              <h2>{{ restaurant[1].name }}</h2>
              <img v-bind:src="restaurant[1].image" alt="Restaurant image" />
              <br />
              <br />
              <br />
              <div id="Description">
                <span>Cuisine: {{ restaurant[1].cuisine }}</span>
                <br />
                <span>Opening hours: {{ restaurant[1].openingHours }}</span>
                <br />
                <span>Price range: {{ restaurant[1].priceRange }}</span>
                <br />
                <span>Address: {{ restaurant[1].address }}</span>
                <br />
                <br />
                <button
                  id="restaurantWebsite"
                  v-on:click="go(restaurant[1].websiteLink)"
                >
                  Visit Restaurant's Website!
                </button>
                <button
                  v-if="favRestaurantCheck(restaurant[0])"
                  v-on:click="unfav(restaurant[0])"
                  id="fav"
                  title="Unfavourite"
                >
                  <img
                    src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678087-heart-512.png"
                  />
                </button>
                <button
                  v-if="!favRestaurantCheck(restaurant[0])"
                  v-on:click="fav(restaurant[0])"
                  id="unfav"
                  title="Favourite"
                >
                  <img
                    src="https://uxwing.com/wp-content/themes/uxwing/download/15-healthcare-and-medical/heart-black.png"
                  />
                </button>
              </div>
              <br />
              <br />
              <span id="credits"
                >Contributed by: {{ restaurant[1].contributor }}</span
              >
            </li>
          </ul>
        </div>
      </div>
      <div class="footerContainer">
        <p class="footerText">Design by JKJR</p>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "../firebase.js";
import logout from "./logout.js";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";

var db = firebase.firestore();

export default {
  props: ["searchedValue"],
  data() {
    return {
      restaurants: [],
      favRestaurant: [],
      submit: false,
      filter: false,
      price: false,
      cuisine: false,
      priceValue: "",
      selected: "",
    };
  },

  components: {
    PulseLoader,
  },

  methods: {
    logout: logout,
    fetchItems: function() {
      db.collection("restaurant")
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            //if empty search return all
            if (this.searchedValue == null) {
              this.restaurants.push([doc.id, doc.data()]);
            } else {
              if (
                doc
                  .data()
                  .name.toUpperCase()
                  .includes(this.searchedValue.toUpperCase())
              ) {
                this.restaurants.push([doc.id, doc.data()]);
              } else if (
                doc
                  .data()
                  .cuisine.toUpperCase()
                  .includes(this.searchedValue.toUpperCase())
              ) {
                this.restaurants.push([doc.id, doc.data()]);
              } else if (
                doc
                  .data()
                  .contributor.toUpperCase()
                  .includes(this.searchedValue.toUpperCase())
              ) {
                this.restaurants.push([doc.id, doc.data()]);
              } else if (
                doc
                  .data()
                  .address.toUpperCase()
                  .includes(this.searchedValue.toUpperCase())
              ) {
                this.restaurants.push([doc.id, doc.data()]);
              }
            }
          });
          this.isLoading = false;
        });
    },
    go: function(url) {
      window.open(url);
    },
    getFavourites: function() {
      db.collection("user")
        .doc(this.$store.state.uid)
        .get()
        .then((doc) => {
          this.favRestaurant = doc.data().favRestaurant;
        });
    },
    favRestaurantCheck: function(id) {
      return this.favRestaurant.includes(id);
    },
    unfav: function(id) {
      var index = this.favRestaurant.indexOf(id);
      this.favRestaurant.splice(index, 1);
      db.collection("user")
        .doc(this.$store.state.uid)
        .update({
          favRestaurant: firebase.firestore.FieldValue.arrayRemove(id),
        });
    },
    fav: function(id) {
      this.favRestaurant.push(id);
      db.collection("user")
        .doc(this.$store.state.uid)
        .update({
          favRestaurant: firebase.firestore.FieldValue.arrayUnion(id),
        });
    },
    sort: function(input) {
      this.restaurants = [];
      if (input == "price") {
        db.collection("restaurant")
          .get()
          .then((snapshot) => {
            var lowest = [];
            var two = [];
            var three = [];
            var four = [];
            var five = [];
            var six = [];
            var highest = [];
            snapshot.docs.forEach((doc) => {
              if (doc.data()["priceRange"] == "less than $20") {
                lowest.push([doc.id, doc.data()]);
              } else if (doc.data()["priceRange"] == "$20 to $50") {
                two.push([doc.id, doc.data()]);
              } else if (doc.data()["priceRange"] == "$50 to $100") {
                three.push([doc.id, doc.data()]);
              } else if (doc.data()["priceRange"] == "$100 to $150") {
                four.push([doc.id, doc.data()]);
              } else if (doc.data()["priceRange"] == "$150 to $200") {
                five.push([doc.id, doc.data()]);
              } else if (doc.data()["priceRange"] == "$200 to $300") {
                six.push([doc.id, doc.data()]);
              } else {
                highest.push([doc.id, doc.data()]);
              }
            });
            for (var i = 0; i < lowest.length; i++) {
              this.restaurants.push(lowest[i]);
            }
            for (i = 0; i < two.length; i++) {
              this.restaurants.push(two[i]);
            }
            for (i = 0; i < three.length; i++) {
              this.restaurants.push(three[i]);
            }
            for (i = 0; i < four.length; i++) {
              this.restaurants.push(four[i]);
            }
            for (i = 0; i < five.length; i++) {
              this.restaurants.push(five[i]);
            }
            for (i = 0; i < six.length; i++) {
              this.restaurants.push(six[i]);
            }
            for (i = 0; i < highest.length; i++) {
              this.restaurants.push(highest[i]);
            }
          });
      } else {
        db.collection("restaurant")
          .orderBy(input)
          .get()
          .then((snapshot) => {
            snapshot.docs.forEach((doc) => {
              this.restaurants.push([doc.id, doc.data()]);
            });
          });
      }
      this.submit = false;
    },
    filterCuisine: function(cuisine) {
      this.restaurants = [];
      db.collection("restaurant")
        .where("cuisine", "==", cuisine)
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            this.restaurants.push([doc.id, doc.data()]);
          });
        });
      this.filter = false;
      this.cuisine = false;
    },

    filterPrice: function(price) {
      this.restaurants = [];
      db.collection("restaurant")
        .where("priceRange", "==", price)
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            this.restaurants.push([doc.id, doc.data()]);
          });
        });
      this.filter = false;
      this.price = false;
    },

    test: function() {
      var slider = document.getElementById("myRange");
      var output = document.getElementById("demo");
      var values = [
        "less than $20",
        "$20 to $50",
        "$50 to $100",
        "$100 to $150",
        "$150 to $200",
        "$200 to $300",
        "above $300",
      ];
      output.innerHTML = values[slider.value];
      this.priceValue = values[slider.value];
    },
  },
  created() {
    this.fetchItems();
    this.favRestaurantCheck();
  },
  updated() {
    this.getFavourites();
  },
};
</script>

<style scoped>
.borderDiv {
  position: relative;
  bottom: 30px;
}

.RestaurantContainer {
  width: 100%;
  padding-right: 20px;
}

#BriefDescription {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  line-height: 5px;
}

#restaurantWebsite {
  background: #0088cc;
  width: 250px;
  border-radius: 8px;
  color: #ffffff;
  font-family: Helvetica;
  font-size: 18px;
  font-weight: 100;
  padding: 5px;
  border: solid #0088cc 1px;
  text-decoration: none;
}

#restaurantWebsite:hover {
  border: solid #979797 1px;
  background: #979797;
  -webkit-border-radius: 20px;
  -moz-border-radius: 14px;
  border-radius: 8px;
  text-decoration: none;
}
#Description {
  line-height: 20px;
  text-align: center;
  padding: 5px 30px;
}

#list {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}
img {
  width: 100px;
  height: 100px;
}

h2,
img {
  padding-right: 20px;
}

#FullRecipe {
  padding: 10px;
}

#Directions {
  list-style-type: none;
}

#loading {
  min-height: 30em;
  align-items: center;
  display: flex;
  justify-content: center;
}
#credits {
  float: right;
}

#fav img {
  height: 35px;
  width: 35px;
}

#fav {
  border: none;
  width: 50px;
  height: 43px;
  text-align: center;
  border-radius: 8px;
  transform: translate(0px, 10px);
}

#fav:hover {
  cursor: pointer;
}

#unfav img {
  height: 30px;
  width: 33px;
}

#unfav {
  border: none;
  width: 50px;
  height: 43px;
  text-align: center;
  border-radius: 8px;
  padding-top: 5px;
  transform: translate(0px, 9px);
}

#unfav:hover {
  cursor: pointer;
}

.sortFilterButton {
  background: #0088cc;
  width: 100px;
  border-radius: 8px;
  color: #ffffff;
  font-family: Helvetica;
  font-size: 18px;
  font-weight: 100;
  padding: 5px;
  border: solid #0088cc 1px;
  margin-bottom: 5px;
}

.miniButton {
  background: turquoise;
  border-radius: 8px;
}

.filterOpt {
  margin-right: 50px;
  background: teal;
  color: #ffffff;
  font-weight: 100;
  border-radius: 8px;
  border: solid teal 1px;
  width: 80px;
}

.filterOpt:hover {
  background-color: #4caf50;
  color: white;
}

.filterOpt:focus {
  background: olive;
}

#block_container {
  height: 90px;
  overflow: hidden;
  position: relative;
  z-index: 1;
}

#bloc1 {
  width: 200px;
  float: left;
}
#bloc2 {
  overflow: hidden;
}
</style>
