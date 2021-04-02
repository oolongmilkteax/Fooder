<template>
  <div class="body">
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
    <div class="ProfileDiv">
      <PulseLoader id="loading" :loading="isLoading"></PulseLoader>
      <li
        id="profilelist"
        v-for="profile in profiles"
        v-bind:key="profile.email"
        v-on:click="gotoProfile(profile)"
      >
        <p>{{ profile[1].name }}</p>
        <p>{{ profile[1].email }}</p>
      </li>
    </div>
  </div>
</template>

<script>
import firebase from "../firebase.js";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import logout from "./logout.js";
var db = firebase.firestore();

export default {
  data() {
    return {
      isLoading: true,
      profiles: [],
    };
  },
  components: {
    PulseLoader,
  },
  methods: {
    logout: logout,
    getProfiles() {
      this.uid = firebase.auth().currentUser.uid;
      db.collection("user")
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            if (doc.id != this.uid) {
              this.profiles.push([doc.id, doc.data()]);
            }
          });
          this.isLoading = false;
        });
    },
    gotoProfile: function(profile) {
      this.$router.push({ name: "ProfilePage", params: { user: profile } });
    },
  },

  created: function() {
    this.getProfiles();
  },
};
</script>

<style>
#profilelist {
  width: 100%;
  text-align: left;
  border: 1px solid rgb(110, 110, 110);
  margin: 10px;
  list-style-type: none;
  padding: 0px 0px 0px 10%;
}

#profilelist:hover {
  cursor: pointer;
}

.ProfileDiv {
  width: 50%;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
