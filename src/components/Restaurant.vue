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
            <b-dropdown-item href="/profile">Profile</b-dropdown-item>
            <b-dropdown-item v-on:click="logout()">Sign Out</b-dropdown-item>
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

    <div id="sortContent" class="sidenav">
      <a href="javascript:void(0)" class="closebtn" v-on:click="closeSort()">&times;</a>
      <a class="dropdown-btn" v-on:click="sort('name')">Name</a>
      <a class="dropdown-btn" v-on:click="sort('cuisine')">Cuisine</a>
      <a class="dropdown-btn" v-on:click="sort('price')">Price</a>
    </div>


    <div id="sortFeature">
      <span style="font-size:30px;cursor:pointer" v-on:click="openSort()">&#8693; Sort</span>
    </div>
    

    <div id="filterContent" class="sidenav">
      <a href="javascript:void(0)" class="closebtn" v-on:click="closeFilter()">&times;</a>
      

      <button class="dropdown-btn" v-on:click="showCuisine()" id="filCuisine">Cuisine &#9660;
      </button>
      <div class="dropdown-container" id="filCuisineChoice">
      <div  v-for="cuisine in cuisines" v-bind:key="cuisine">
        <a v-on:click="cuisineChoice=['cuisine', cuisine]">{{cuisine}}</a>
      </div>
      </div>

      <button class="dropdown-btn" v-on:click="showPrice()" id="filPrice">Price &#9660;
      </button>
      
      <div class="dropdown-container" id="filPriceChoice">
        <input  v-on:change="test()" type="range" list="tickmarks" min="0" max="6" value="50" class="slider" id="myRange"><br>
        <span><strong>Value: <span id="demo"></span></strong></span>

      </div>

      <a id="submit" style="font-size:30px;cursor:pointer;" v-on:click="filtering"><strong>Search</strong></a>
    </div>


    <div id="filterSort">
      <span style="font-size:30px;cursor:pointer" v-on:click="openFilter()">&#9776; Filter</span>
    </div>
    <br>

    <div class="borderDiv">
      <PulseLoader id="loading" :loading="isLoading"></PulseLoader>
      <div class="RestaurantContainer">
        <div id="Restaurant">
          <ul id="BriefDescription">
            <li id="list" v-for="restaurant in restaurants" v-bind:key="restaurant">
              <div class="card" style="width: 25rem;">
                <img class="img" v-bind:src="restaurant[1].image" alt="Restaurant Image" height="20px">
                <div class="card-body">
                  <h5 class="name">{{restaurant[1].name}}</h5>
                  <div id="Description">
                    <span>Cuisine: {{restaurant[1].cuisine}}</span>
                    <br />
                    <span>Opening hours: {{restaurant[1].openingHours}}</span>
                    <br />
                    <span>Price range: {{restaurant[1].priceRange}}</span>
                    <br />
                    <span>Address: {{restaurant[1].address}}</span>
                    <button
                      id="restaurantWebsite"
                      v-on:click="go(restaurant[1].websiteLink);"
                    >Visit Restaurant's Website!
                    </button>
                    <button
                      v-if = "favRestaurantCheck(restaurant[0])"
                      v-on:click = "unfav(restaurant[0])" 
                      id = "fav"
                      title = "Unfavourite"
                    >
                      <img 
                        src ="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678087-heart-512.png"
                      >
                    </button>
                    <button 
                      v-if= "!favRestaurantCheck(restaurant[0])" 
                      v-on:click = "fav(restaurant[0])"
                      id = "unfav"
                      title = "Favourite"
                    >
                      <img 
                        src ="https://uxwing.com/wp-content/themes/uxwing/download/15-healthcare-and-medical/heart-black.png"
                      >
                    </button>
                  </div>
                </div>
                <br>
                <br>
                <span id="credits">Contributed by: {{restaurant[1].contributor}}</span>
                <br>
                <br>
                <br>
              </div>
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
      filters: [],
      save: [],
      cuisineChoice: [],
      cuisines: [],
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
              this.save.push([doc.id,doc.data()]);
              if (!this.cuisines.includes(doc.data()["cuisine"])) {
                this.cuisines.push(doc.data()["cuisine"]);
              }
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

    filtering: function() {
      if(this.priceValue != "") {
        this.filters.push(['priceRange',this.priceValue]);
      }
      if (this.cuisineChoice.length != 0) {
        this.filters.push(this.cuisineChoice);        
      }
      this.restaurants = [...this.save];
      for (var i = 0; i < this.restaurants.length; i++){
        for (var j = 0; j < this.filters.length; j++){
          if (this.restaurants[i][1][this.filters[j][0]] != this.filters[j][1])  {
            this.restaurants.splice(i,1);
            i--;
            break;
          }
        }
      }
      this.filters.splice(0, this.filters.length);
      this.priceValue = "";
      this.cuisineChoice = [];
      this.filter=false;
      this.price=false;
      this.cuisine=false;
      document.getElementById("demo").innerHTML = "";
      
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
    openSort: function() {
      document.getElementById("sortContent").style.width = "220px";
    },
    closeSort: function() {
      document.getElementById("sortContent").style.width = "0";
    },
    openFilter: function() {
      document.getElementById("filterContent").style.width = "220px";
    },
    closeFilter: function() {
      document.getElementById("filterContent").style.width = "0";
    },
    showCuisine: function() {
      
      if (document.getElementById("filCuisineChoice").style.display === "block") {
        document.getElementById("filCuisineChoice").style.display = "none";
      }
       else {
         document.getElementById("filCuisineChoice").style.display = "block";

       }
       
    },
    showPrice: function() {
      
      if (document.getElementById("filPriceChoice").style.display === "block") {
        document.getElementById("filPriceChoice").style.display = "none";
      }
       else {
         document.getElementById("filPriceChoice").style.display = "block";
       }
       
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
#Description {
  line-height: 23px;
}

.img {
  width: 100%;
  height: 15rem;
  object-fit: cover;
}

.borderDiv {
  position: relative;
  bottom: 30px;
}

.RestaurantContainer {
  width: 100%;
}

#list {
  border: none;
}

#restaurantWebsite {
  background: #0088cc;
  width: 250px;
  border-radius: 8px;
  color: #ffffff;
  font-family: Helvetica;
  font-size: 18px;
  font-weight: 100;
  padding: 10px;
  border: solid #0088cc 1px;
  text-decoration: none;
  transform: translate(0px, 10px)
}

#restaurantWebsite:hover {
  border: solid #979797 1px;
  background: #979797;
  -webkit-border-radius: 20px;
  -moz-border-radius: 14px;
  border-radius: 8px;
  text-decoration: none;
}

img {
  width: 100px;
  height: 100px;
}

#loading {
  min-height: 30em;
  align-items: center;
  display: flex;
  justify-content: center;
}

#credits {
  text-align: right;
  padding-right: 20px;
}

#fav img {
  height: 35px;
  width: 35px;
}

#fav {
  border: none;
  width: 50px;
  text-align: center;
  border-radius: 8px;
  background: white;
  transform: translate(0px, 10px)
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
  text-align: center;
  border-radius: 8px;
  padding-top: 5px;
  background: white;
  transform: translate(0px, 10px)
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

.sidenav {
  height: 100%;
  width: 0;
  position: absolute;
  z-index: 1;
  top: 140px;
  left: 0;
  background-color: #111;
  overflow-x: hidden;
  transition: 0.5s;
  /*padding-top: 60px;*/
}

.sidenav a {
  padding: 8px 8px 8px 16px;
  text-decoration: none;
  font-size: 20px;
  color: #818181;
  display: block;
  transition: 0.3s;
}

.sidenav a:hover {
  color: #f1f1f1;
}

#submit:hover  {
  color: #f1f1f1;
}

.sidenav .closebtn {
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
}

#main {
  transition: margin-left .5s;
  padding: 16px;
}

.dropdown-btn {
  padding: 6px 8px 6px 16px;
  text-decoration: none;
  font-size: 20px;
  color: #818181;
  display: block;
  border: none;
  background: none;
  width: 100%;
  text-align: left;
  cursor: pointer;
  outline: none;
}

.dropdown-btn:hover {
  color: #f1f1f1;
}

.active {
  background-color: #0088cc;
  color: white;
}

.dropdown-container {
  display: none;
  background-color: #262626;
  padding-left: 8px;
}

</style>
