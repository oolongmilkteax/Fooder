<template>
    <form>
        <label for="name">Name of Restaurant: </label><br>
        <input class="contriInput"
        type="text"
        id="name"
        name="name"
        v-model="restaurant.name"/>
        <br>
        
        <label for="address">Address: </label>
        <span>{{restaurant.address}}</span>
        <br>

        <input class="contriInput"
        type="text"
        id="address"
        name="address"
        v-model="restaurant.address"/>
        <br>

        <label for="cuisine">Cuisine: </label>
        <span>{{restaurant.cuisine}}</span>
        <br>

        <input class="contriInput"
        type="text"
        id="cuisine"
        name="cuisine"
        v-model="restaurant.cuisine"/>
        <br>

        <label for="image">ImageURL (for display purposes): </label>
        <span>{{restaurant.image}}</span>
        <br>

        <input class="contriInput"
        type="text"
        id="image"
        name="image"
        placeholder="Please provide a valid link"
        v-model="restaurant.image"/>
        <br>

        <label for="openingHours">Opening hours: </label>
        <span>{{restaurant.openingHours}}</span>
        <br>

        <input class="contriInput"
        type="text"
        id="openingHours"
        name="openingHours"
        v-model="restaurant.openingHours" 
        placeholder="eg: 11:30am–2:30pm, 5:30pm–10:30pm"/>
        <br>

        <label for="priceRange">Price range: </label>
        <span>{{restaurant.priceRange}}</span>
        <br>

        <select class="contriInput"
        type="text"
        id="priceRange"
        name="priceRange"
        v-model="restaurant.priceRange">
            <option value="less than $20">less than $20</option>
            <option value="$20 to $50">$20 to $50</option>
            <option value="$50 to $100">$50 to $100</option>
            <option value="$100 to $150">$100 to $150</option>
            <option value="$150 to $200">$150 to $200</option>
            <option value="$200 to $300">$200 to $300</option>
            <option value="above $300">above $300</option>
        </select>
        <br>

        <label for="websiteLink">Website: </label>
        <span>{{restaurant.websiteLink}}</span>
        <br>

        <input class="contriInput"
        type="text"
        id="websiteLink"
        name="websiteLink"
        v-model="restaurant.websiteLink"/>
        <br>

        <button type="button" id="submitRestaurantButton" v-on:click="submitRestaurant">Submit!</button>
    </form>
</template>

<script>
import firebase from '../firebase.js'
var db = firebase.firestore()
import {getUid} from '../userObj.js'

export default {
  data() {
    return {
      restaurant: {
          address: "", 
          cuisine: "",
          image: "",
          name: "",
          openingHours: "",
          priceRange: "",
          websiteLink: ""
        }
    };
  },
  methods: {
      submitRestaurant: function() {
      db.collection('restaurant').add(this.restaurant)
      .then( (doc) => {
        this.id = doc.id;
        db.collection('user').doc(getUid()).update({
          "contributeRestaurant": firebase.firestore.FieldValue.arrayUnion(this.id)
        })
        location.reload()
      })
    }
  }
}
</script>