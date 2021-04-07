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
            <b-dropdown-item href="/dashboard">Dashboard</b-dropdown-item>
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
    <div class="ProfileDiv">
      <PulseLoader id="loading" :loading="isLoading"></PulseLoader>
      <b-card-group deck>
        <li
        id="profilelist"
        class="col-md-4"
        v-for="profile in profiles"
        v-bind:key="profile.email"
        v-on:click="gotoProfile(profile)"
        >  
        <b-card :title="profile[1].name" bg-variant="secondary" text-variant="white" class="mb-4 mx-auto" style="max-width: 24rem;">
          <b-card-text>
            {{ profile[1].email }}
          </b-card-text>

       </b-card>
       </li>
      </b-card-group>
    </div>
  </div>
</template>

<script>
import firebase from "../firebase.js";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import logout from "./logout.js";
var db = firebase.firestore();

export default {
  props: ["searchedValue"],
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
            if(this.searchedValue == null){
              if (doc.id != this.uid) {
                this.profiles.push([doc.id, doc.data()]);
              }
            } else {
              if(doc.data().name.toUpperCase().includes(this.searchedValue.toUpperCase())) {
                this.profiles.push([doc.id,doc.data()]);
              }else if(doc.data().email.toUpperCase().includes(this.searchedValue.toUpperCase())){
                this.profiles.push([doc.id,doc.data()]);
              }
            }
          });
          this.isLoading = false;
        });
    },
    gotoProfile: function(profile) {
      this.$router.push({ name: "ProfilePage", params: { userProfile: profile } });
    },
  },

  created: function() {
    this.getProfiles();
  },
};
</script>

<style>
#profilelist {
  /*
  width: 100%;
  text-align: left;
  border: 1px solid rgb(110, 110, 110);
  margin: 10px;
  */
  list-style-type: none;
  padding: 0px 0px 0px 0px;
}

#profilelist:hover {
  cursor: pointer;
}
/*
.ProfileDiv {
  width: 50%;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
*/
</style>
