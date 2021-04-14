<template>
  <div class="body">
    <Cheader></Cheader>
    <b-button v-b-toggle.sidebar-no-header class="FnSbtn">Sort & Filter</b-button>
    <b-sidebar id="sidebar-no-header" aria-labelledby="sidebar-no-header-title" no-header shadow v-if="cuisines.length != 0">
      <template #default="{ hide }">
        <h1>Sort</h1>
        <a class="dropdown-btn" v-on:click="sort('name')">Name</a>
        <a class="dropdown-btn" v-on:click="sort('cuisine')">Cuisine</a>
        <a class="dropdown-btn" v-on:click="sort('price')">Price</a>
      
        <h1>Filter</h1>
          <button class="dropdown-btn" v-on:click="showCuisine()" id="filCuisine">Cuisine &#9660;
          </button>
          <div class="dropdown-container" id="filCuisineChoice">
          <div  v-for="cuisine in cuisines" v-bind:key="cuisine">
            <a class="choiceMade" style="cursor:pointer" v-bind:id="cuisine" v-on:click="uniqueCuisine(['cuisine', cuisine]);">{{cuisine}}</a>
          </div>
          
          </div>

          <button class="dropdown-btn" v-on:click="showPrice()" id="filPrice">Price &#9660;
          </button>
          
          <div class="dropdown-container" id="filPriceChoice">
            <input  v-on:change="find()" type="range" list="tickmarks" min="0" max="7" value="50" class="slider" id="myRange"><br>
            <span><strong>Value: <span id="demo"></span></strong></span>

          </div>

          <b-button id="submit" v-on:click="filtering" class="ApplyButton">Apply Filter</b-button>
          <b-button class="closeSidebtn" block @click="hide">Close Sidebar</b-button>
      </template>
    </b-sidebar>


    <br>

    <div class="borderDiv">
      <PulseLoader id="loading" :loading="isLoading"></PulseLoader>
      <h1 v-if="noResult">No Results! :(</h1>
      <div class="RestaurantContainer">
        <div id="Restaurant">
          <ul id="BriefDescription">
            <li id="list" v-for="restaurant in restaurants" v-bind:key="restaurant.name">
              <div class="card" style="width: 25rem;">
                <img class="img" v-bind:src="restaurant[1].image" onerror="this.onerror=null;this.src='https://s3-ap-southeast-1.amazonaws.com/itask-dev/task/not_available.png'" height="20px">
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
                    <br>
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
                <br>
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
      
    </div>
    <Cfooter></Cfooter>
  </div>
</template>

<script>
import firebase from "../Authentication/firebase.js";
import logout from "../Authentication/logout.js";
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
      isLoading: true,
      noResult: false,
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
            //this.save.push([doc.id,doc.data()]);
            if (this.searchedValue == null) {
              this.restaurants.push([doc.id, doc.data()]);
              this.save.push([doc.id,doc.data()]);
              if (!this.cuisines.includes(doc.data().cuisine)) {
                this.cuisines.push(doc.data().cuisine);
              }
            } else {
              if (doc.data().name.toUpperCase().includes(this.searchedValue.toUpperCase())) {
                this.restaurants.push([doc.id, doc.data()]);
                this.save.push([doc.id,doc.data()]);
                if (!this.cuisines.includes(doc.data().cuisine)) {
                this.cuisines.push(doc.data().cuisine);
                }
              } else if (doc.data().cuisine.toUpperCase().includes(this.searchedValue.toUpperCase())) {
                this.restaurants.push([doc.id, doc.data()]);
                this.save.push([doc.id,doc.data()]);
                if (!this.cuisines.includes(doc.data().cuisine)) {
                this.cuisines.push(doc.data().cuisine);
                }
              } else if (doc.data().contributor.toUpperCase().includes(this.searchedValue.toUpperCase())) {
                this.restaurants.push([doc.id, doc.data()]);
                this.save.push([doc.id,doc.data()]);
                if (!this.cuisines.includes(doc.data().cuisine)) {
                this.cuisines.push(doc.data().cuisine);
                }
              } else if (doc.data().address.toUpperCase().includes(this.searchedValue.toUpperCase())) {
                this.restaurants.push([doc.id, doc.data()]);
                this.save.push([doc.id,doc.data()]);
                if (!this.cuisines.includes(doc.data().cuisine)) {
                this.cuisines.push(doc.data().cuisine);
                }
              }
            }
          });
          this.isLoading = false;
          if(this.recipes.length == 0){
            this.noResult = true;
          }
        });
    },
    uniqueCuisine: function(option) {
      if (this.cuisineChoice.length == 0) {
        this.cuisineChoice.push(option);
        document.getElementById(option[1]).style.color="Red"
      } else {
        for (var i=0; i<this.cuisineChoice.length; i++) {
          if (option[1] == this.cuisineChoice[i][1]) {
            this.cuisineChoice.splice(i,1)
            document.getElementById(option[1]).style.color="#007bff";
            break
          }
          if (i == this.cuisineChoice.length-1) {
            this.cuisineChoice.push(option);
            document.getElementById(option[1]).style.color="Red"
            break;
          
          }
        }
      }
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
      if (this.searchedValue != null) {
        if (input =='price') {
            var lowest = [];
            var two = [];
            var three = [];
            var four = [];
            var five = [];
            var six = [];
            var highest = [];
            for (var i=0; i<this.restaurants.length; i++) {
              if (this.restaurants[i][1]["priceRange"] == "less than $20") {
                lowest.push(this.restaurants[i]);
              } else if (this.restaurants[i][1]["priceRange"] == "$20 to $50") {
                two.push(this.restaurants[i]);
              } else if (this.restaurants[i][1]["priceRange"] == "$50 to $100") {
                three.push(this.restaurants[i]);
              } else if (this.restaurants[i][1]["priceRange"] == "$100 to $150") {
                four.push(this.restaurants[i]);
              } else if (this.restaurants[i][1]["priceRange"] == "150 to $200") {
                five.push(this.restaurants[i]);
              } else if (this.restaurants[i][1]["priceRange"] == "$200 to $300") {
                six.push(this.restaurants[i]);
              } else {
                highest.push(this.restaurants[i])
              }
            }
          this.restaurants = [];
          for ( i = 0; i < lowest.length; i++){
              this.restaurants.push(lowest[i]);
          }
          for (i = 0; i < two.length; i++){
            this.restaurants.push(two[i]);
          }
          for (i = 0; i < three.length; i++){
            this.restaurants.push(three[i]);
          }
          for (i = 0; i < four.length; i++){
            this.restaurants.push(four[i]);
          }
          for (i = 0; i < five.length; i++){
            this.restaurants.push(five[i]);
          } 
          for (i = 0; i < six.length; i++) {
          this.restaurants.push(six[i]);
          }
          for (i = 0; i < highest.length; i++) {
            this.restaurants.push(highest[i]);
          }
        } else {
          var newList = [];
          var sortValues = [];
          for (i =0; i<this.restaurants.length; i++) {
            sortValues.push(this.restaurants[i][1][input]);
          }
          sortValues.sort();
          var count = 0;
          for (i=0; i<this.restaurants.length; i++) {
            for (var j=0; j<this.restaurants.length; j++) {
              if (sortValues[count] == this.restaurants[j][1][input]) {
                newList.push(this.restaurants[j])
                count += 1;
                this.restaurants.splice(j,1);
                i--;
                j--;
                break;
              }            
            }
          }
          this.restaurants = newList
        }
      }

      else {
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
      }
    },


    filtering: function() {
      this.restaurants = [...this.save];
      var newList = []
      if(this.cuisineChoice.length) {
      for (var i=0; i<this.restaurants.length;i++) {
        for (var  j = 0; j < this.cuisineChoice.length; j++){
          if (this.restaurants[i][1][this.cuisineChoice[j][0]] == this.cuisineChoice[j][1])  {
            newList.push(this.restaurants[i])
            break;
          }
        }
      }
      this.restaurants=newList;
      newList = [];
      }
      if(this.priceValue != "") {
        for ( i=0; i<this.restaurants.length;i++) {
          if(this.restaurants[i][1]['priceRange'] == this.priceValue) {
            newList.push(this.restaurants[i])
          }
        }
        this.restaurants=newList;
        newList = [];
      }
      
    },

    find: function() {
      var slider = document.getElementById("myRange");
      var output = document.getElementById("demo");
      var values = [
        "",
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
.ApplyButton{
  margin: 10px;
}

.FnSbtn{
  margin:60px;
  padding:10px 50px 10px 50px;
}

#Description {
  line-height: 23px;
}

#BriefDescription {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  line-height: 5px;
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
  font-style: italic;
  color: #8a8a8a;
}

#fav img {
  height: 36px;
  width: 36px;
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
  width: 34px;
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

.sidenav {
  height: 100%;
  width: 0;
  position: absolute;
  z-index: 1;
  top: 140px;
  left: 0;
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
  color: #2d4fac;
}
.choiceMade:hover{
  color: #2d4fac;
}
.active {
  background-color: #0088cc;
  color: white;
}

.dropdown-container {
  display: none;
  padding-left: 8px;
}

.closeSidebtn{
  width: 93%;
  margin-left: 10px;

}

</style>
