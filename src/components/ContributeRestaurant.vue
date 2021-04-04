<template>
  <form>
    <label for="contributing"><strong> Contributing restaurant:</strong></label>
    <br />
    <br />
    <div>
      <label for="restAddress">Restaurant Address:</label><br />
      <input
        class="contriInput"
        type="text"
        id="restAddress"
        name="restAddress"
        v-model="restAddress"
      /><br />

      <p class="errorMsgs" v-show="this.missingRestAddress">
        Please enter the restaurant's address
      </p>

      <label for="restCuisine">Cuisine:</label><br />
      <input
        class="contriInput"
        type="text"
        id="restCuisine"
        name="restCuisine"
        v-model="restCuisine"
      /><br />

      <p class="errorMsgs" v-show="this.missingRestCuisine">
        Please enter the restaurant's cuisine
      </p>

      <label for="imageLink">Image:</label><br />
      <input
        class="contriInput"
        type="text"
        id="imageLink"
        name="imageLink"
        v-model="imageLink"
      /><br />

      <p class="errorMsgs" v-show="this.missingImageLink">
        Please submit an image of the restaurant
      </p>

      <label for="restName">Restaurant Name:</label><br />
      <input
        class="contriInput"
        type="text"
        id="restName2"
        name="restName"
        v-model="restName"
      /><br />

      <p class="errorMsgs" v-show="this.missingRestName">
        Please enter the name of the restaurant
      </p>

      <label for="openingHours">Opening hours:</label><br />
      <input
        class="contriInput"
        type="text"
        id="openingHours"
        name="openingHours"
        v-model="openingHours"
        placeholder="eg 11:30am–2:30pm, 5:30pm–10:30pm"
      /><br />

      <p class="errorMsgs" v-show="this.missingOpeningHours">
        Please state the time periods that the restaurant will be open for
      </p>

      <label for="priceRange">Price range:</label><br />
      <input
        class="contriInput"
        type="text"
        id="priceRange"
        name="priceRange"
        v-model="priceRange"
        placeholder="eg $15–$35"
      /><br />

      <p class="errorMsgs" v-show="this.missingPriceRange">
        Please kindly estimate how much a meal would cost at this restaurant
      </p>

      <label for="websiteLink">Website:</label><br />
      <input
        class="contriInput"
        type="text"
        id="websiteLink"
        name="websiteLink"
        v-model="websiteLink"
      /><br />

      <p class="errorMsgs" v-show="this.missingWebsiteLink">
        Please enter the restaurant's website
      </p>
    </div>

    <div v-show="contributeType === 'recipe'">
      <label for="ingredients">Ingredients:</label>
      <br />
      <textarea
        class="contriInput"
        type="text"
        id="ingre"
        name="fullName"
      ></textarea>
      <br />

      <label for="instructins">Instructions:</label>
      <br />
      <textarea
        class="contriInput"
        type="text"
        id="ingre"
        name="fullName"
      ></textarea>
      <br />
    </div>
    <button
      id="submitContributionButton"
      type="button"
      v-on:click="
        addRestaurant();
        addContribution();
      "
    >
      Submit!
    </button>
  </form>
</template>

<script>
import firebase from "../firebase.js";
var db = firebase.firestore();

export default {
  data() {
    return {
      contributeType: "nothing",
      missingRestAddress: false,
      missingRestCuisine: false,
      missingImageLink: false,
      missingRestName: false,
      missingOpeningHours: false,
      missingPriceRange: false,
      missingWebsiteLink: false,
      restAddress: "",
      restCuisine: "",
      imageLink: "",
      restName: "",
      openingHours: "",
      priceRange: "",
      websiteLink: "",
      allFilled: true,
      size: 0,
    };
  },
  methods: {
    Restaurant: function() {
      this.contributeType = "restaurant";
    },
    Recipe: function() {
      this.contributeType = "recipe";
    },
    addRestaurant: function() {
      if (this.restAddress === "") {
        this.missingRestAddress = true;
        this.allFilled = false;
      } else {
        this.missingRestAddress = false;
        this.allFilled = true;
      }

      if (this.restCuisine === "") {
        this.missingRestCuisine = true;
        this.allFilled = false;
      } else {
        this.missingRestCuisine = false;
        this.allFilled = true;
      }

      if (this.imageLink === "") {
        this.missingImageLink = true;
        this.allFilled = false;
      } else {
        this.missingImageLink = false;
        this.allFilled = true;
      }

      if (this.restName === "") {
        this.missingRestName = true;
        this.allFilled = false;
      } else {
        this.missingRestName = false;
        this.allFilled = true;
      }

      if (this.openingHours === "") {
        this.missingOpeningHours = true;
        this.allFilled = false;
      } else {
        this.missingOpeningHours = false;
        this.allFilled = true;
      }

      if (this.priceRange === "") {
        this.missingPriceRange = true;
        this.allFilled = false;
      } else {
        this.missingPriceRange = false;
        this.allFilled = true;
      }
      /*
      if (this.websiteLink === "") {
          this.missingWebsiteLink = true;
          this.allFilled = false;
      } else {
          this.missingWebsiteLink = false;
          this.allFilled = true;
      }
      */

      if (this.allFilled == true) {
        var newId = (this.size + 1).toString();
        db.collection("restaurant")
          .doc(newId)
          .set({
            address: this.restAddress,
            cuisine: this.restCuisine,
            image: this.imageLink,
            name: this.restName,
            openingHours: this.openingHours,
            priceRange: this.priceRange,
            websiteLink: this.websiteLink,
          })
          .then(() => {
            location.reload();
          });
      }
    },

    addContribution: function() {
      if (this.allFilled == true) {
        var docRef = db
          .collection("restaurant")
          .doc((this.size + 1).toString());

        db.collection("user")
          .doc(this.$store.state.uid)
          .update({
            contributeRestaurant: firebase.firestore.FieldValue.arrayUnion(
              docRef
            ),
          })
          .then(() => {
            location.reload();
          });
      }

      //db.collection("restaurant").doc("21").delete()
    },
  },
  created() {
    db.collection("restaurant")
      .get()
      .then((snap) => {
        this.size = snap.size;
      });
  },
};
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

.errorMsgs {
  text-align: left;
  color: red;
}
</style>
