<template>
  <div class="body">
    <ul class="ul">
            <router-link to="/" class="routes">LandingPage</router-link>
            <router-link to='/contribute' class="routes">Contribute</router-link>
            <router-link to="/favpage" class="routes">favpage</router-link>
            <router-link to="/recipe" class="routes">Recipe</router-link>
            <router-link to='/preferencing' class="routes">Preferencing</router-link>
            <router-link to="/restaurant" class="routes">Restaurant</router-link>
            <router-link to="/searchpage" class="routes">Search Page</router-link>
            <router-link to='/signup' class="routes">Sign Up</router-link>
    </ul>
      <div class="borderDiv">
            <div class="RestaurantContainer">
                <div id="Restaurant">
                    <ul id="BriefDescription">
                        <li id="list" v-for="restaurant in restaurants" v-bind:key="restaurant">
                            <h2>{{restaurant.name}}</h2>
                            <img v-bind:src="restaurant.image" alt = "Restaurant image"><br><br><br>
                            <div id = "Description">
                            <span>Cuisine: {{restaurant.cuisine}}</span><br>
                            <span>Opening hours: {{restaurant.openingHours}}</span><br>
                            <span>Price range: {{restaurant.priceRange}}</span><br>
                            <span>Address: {{restaurant.address}}</span><br><br>
                            <button id="restaurantWebsite" v-on:click="go(restaurant.websiteLink);" >Visit Restaurant's Website!</button>
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
import db from "../firebase.js"
export default {
    data() {
        return {
            restaurants: []
        }
    },
    methods: {
        fetchItems: function() {
            db.firestore().collection('restaurant').get().then(snapshot => {
            snapshot.docs.forEach(doc => {
            this.restaurants.push(doc.data()) 
            })
            })
        },
        go: function(url) {
           window.open(url);
        }
    },
    created() {
        this.fetchItems()
    }
}
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
    background: 	#0088cc;
    width: 250px;
    border-radius: 8px;
    color: #ffffff;
    font-family: Helvetica;
    font-size: 18px;
    font-weight: 100;
    padding: 5px;
    border: solid 	#0088cc 1px;
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
    padding: 5px 80px;
}

#list {
    flex-grow: 1;
    flex-basis: 300px;
    text-align: center;
    padding: 5px;
    border: 1px solid #222;
    margin: 10px;
}
img{
  width:100px;
  height: 100px;
}

h2, img {
  padding-right: 20px;
}

#FullRecipe {
    padding: 10px;
}

#Directions {
    list-style-type: none;
}
</style>