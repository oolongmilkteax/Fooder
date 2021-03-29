<template>
  <div class="body">
    <ul class="ul">
      <router-link to="/contribute" class="routes">Contribute</router-link>
      <router-link to="/favpage" class="routes">favpage</router-link>
      <router-link to="/recipe" class="routes">Recipe</router-link>
      <router-link to="/preferencing" class="routes">Preferencing</router-link>
      <router-link to="/restaurant" class="routes">Restaurant</router-link>
      <router-link to="/searchpage" class="routes">Search Page</router-link>
      <router-link to="/" class="routes">Logout</router-link>
      <router-link to="/profile" class="routes">Profile</router-link>
      <router-link to="/characteristic" class="routes">Characteristic</router-link>
      <router-link to="/profileresults" class="routes">ProfileSearch</router-link>
    </ul>
    <div class="borderDiv">
      <loading id="loading" :active.sync="isLoading"></loading>
      <div class="RestaurantContainer">
        <div id="Restaurant">
          <ul id="BriefDescription">
            <li id="list" v-for="restaurant in restaurants" v-bind:key="restaurant">
              <h2>{{restaurant[1].name}}</h2>
              <img v-bind:src="restaurant[1].image" alt="Restaurant image" />
              <br />
              <br />
              <br />
              <div id="Description">
                <span>Cuisine: {{restaurant[1].cuisine}}</span>
                <br />
                <span>Opening hours: {{restaurant[1].openingHours}}</span>
                <br />
                <span>Price range: {{restaurant[1].priceRange}}</span>
                <br />
                <span>Address: {{restaurant[1].address}}</span>
                <br />
                <br />
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
              <br />
              <br />
              <span id="credits">Contributed by: {{restaurant[1].contributor}}</span>
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
import firebase from '../firebase.js'
var db = firebase.firestore()
import {getUid} from '../userObj.js'

export default {
  props: ['searchedValue'],
  data() {
    return {
      restaurants: [],
      favRestaurant: []
    };
  },
  components: {
    Loading
  },
  methods: {
    fetchItems: function() {
       db
        .collection("restaurant")
        .get()
        .then(snapshot => {
          snapshot.docs.forEach(doc => {
            //if empty search return all
            if(this.searchedValue == null){
              this.restaurants.push([doc.id,doc.data()]);
            }
            else{
              if(doc.data().name.toUpperCase().includes(this.searchedValue.toUpperCase())) {
                this.restaurants.push([doc.id,doc.data()]);
              }else if(doc.data().cuisine.toUpperCase().includes(this.searchedValue.toUpperCase())){
                this.restaurants.push([doc.id,doc.data()]);
              }else if(doc.data().contributor.toUpperCase().includes(this.searchedValue.toUpperCase())){
                this.restaurants.push([doc.id,doc.data()]);
              }else if(doc.data().address.toUpperCase().includes(this.searchedValue.toUpperCase())){
                this.restaurants.push([doc.id,doc.data()]);
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
      db.collection('user').doc(getUid()).get().then((doc) => {
        this.favRestaurant = doc.data().favRestaurant;
      });
    },
    favRestaurantCheck: function(id) {
      return this.favRestaurant.includes(id);
    },
    unfav: function(id) {
      db.collection('user').doc(getUid()).update({
        "favRestaurant": firebase.firestore.FieldValue.arrayRemove(id)})
        .then (() =>
        location.reload()
      )
    },
    fav: function(id) {
      db.collection('user').doc(getUid()).update({
        "favRestaurant": firebase.firestore.FieldValue.arrayUnion(id)})
        .then(() =>
        location.reload()
      )
    }
  },
  created() {
    this.fetchItems();
    this.favRestauantCheck();
  },
  updated() {
    this.getFavourites();
  }
};
</script>

<style scoped>
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
</style>
</style>

