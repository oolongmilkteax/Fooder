<template>
    <form>
        <label for="name">Name of Restaurant: </label>
        <span>{{restaurant.name}}</span>
        <br>
        <span class = "alert" 
        v-show="alert.name"
        >Please enter name of restaurant.
        </span>
        <br>

        <input class="contriInput"
        type="text"
        id="name"
        name="name"
        v-model="restaurant.name"/>
        <br>
        
        <label for="address">Address: </label>
        <span>{{restaurant.address}}</span>
        <br>
        <span class = "alert" 
        v-show="alert.address"
        >Please enter address of restaurant.
        </span>
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
        <span class = "alert" 
        v-show="alert.cuisine"
        >Please enter cuisine type.
        </span>
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
        <span class = "alert" 
        v-show="alert.image"
        >Please enter image URL of restaurant.
        </span>
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
        <span class = "alert" 
        v-show="alert.openingHours"
        >Please enter opening hours of restaurant.
        </span>
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
        <span class = "alert" 
        v-show="alert.priceRange"
        >Please select a price range of restaurant.
        </span>
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
        <span class = "alert" 
        v-show="alert.websiteLink"
        >Please enter website link of restaurant.
        </span>
        <br>

        <input class="contriInput"
        type="text"
        id="websiteLink"
        name="websiteLink"
        v-model="restaurant.websiteLink"/>
        <br>

        <span class = "alert" 
        v-show="alert.submission"
        >Please make sure to fill in every field before submitting!
        </span>
        <br>

        <button type="button" id="submitContributionButton" v-on:click="submitRestaurant">Submit!</button>
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
          websiteLink: "",
          contributor: ""
      },
      alert: {
        address: false,
        cuisine: false,
        image: false,
        name: false,
        openingHours: false,
        priceRange: false,
        websiteLink: false,
        submission: false
      },
      id: ""
    };
  },
  methods: {
    submitRestaurant: function() {
      this.alert.address = false;
      this.alert.cuisine = false;
      this.alert.image = false;
      this.alert.openingHours = false;
      this.alert.priceRange = false;
      this.alert.websiteLink = false;
      this.alert.submission = false;
      if (this.restaurant.name === "") {
        this.alert.name=true;
        this.alert.submission=true;
      } else if (this.restaurant.address === "") {
        this.alert.address=true;
        this.alert.submission=true;
      } else if (this.restaurant.cuisine === "") {
        this.alert.cuisine=true;
        this.alert.submission=true;
      } else if (this.restaurant.image === "") {
        this.alert.image=true;
        this.alert.submission=true;
      } else if (this.restaurant.openingHours === "") {
        this.alert.openingHours=true;
        this.alert.submission=true;
      } else if (this.restaurant.priceRange === "") {
        this.alert.priceRange=true;
        this.alert.submission=true;
      } else if (this.restaurant.websiteLink === "") {
        this.alert.websiteLink=true;
        this.alert.submission=true;
      } else { 
        db.collection('restaurant').add(this.restaurant)
          .then( (doc) => {
            this.id = doc.id;
            db.collection('user').doc(getUid()).update({
             "contributeRestaurant": firebase.firestore.FieldValue.arrayUnion(this.id)
            })
            location.reload();
          })
      }
    },
    getContributor: function() {
      db.collection('user').doc(getUid()).get().then((doc) => {
        this.restaurant.contributor = doc.data().name;
      })
    }

  },
  created() {
    this.getContributor();
  }
}
</script>


<style>
.myTitles {
  font-size: 60px;
  margin-bottom: 5px;
  margin-top: 30px;
  text-align: left;
}

.contriInput {
  padding: 10px;
  border-radius: 10px;
  border-color: #ffffff;
  border-style: solid;
  outline: none;
  margin-top: 7px;
  margin-bottom: 20px;
  width: 40%;
}

#submitContributionButton {
  background: #0088cc;
  width: 20%;
  border-radius: 8px;
  border-radius: 8px;
  color: #ffffff;
  font-family: Helvetica;
  font-size: 28px;
  font-weight: 100;
  padding: 14px;
  border: solid #0088cc 1px;
  margin-top: 30px;
}

#submitContributionButton:hover {
  border: solid #979797 1px;
  background: #979797;
  -webkit-border-radius: 20px;
  -moz-border-radius: 14px;
  border-radius: 8px;
  text-decoration: none;
}

.alert {
  color: red;
}
</style>