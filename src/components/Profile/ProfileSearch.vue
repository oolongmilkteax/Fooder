<template>
  <div class="body">
    <Cheader></Cheader>
    <div class="ProfileDiv">
      <PulseLoader id="loading" color="#0088cc" :loading="isLoading"></PulseLoader>
      <b-card-group deck>
        <li
          id="profilelist"
          class="col-md-4"
          v-for="profile in profiles"
          v-bind:key="profile.email"
          v-on:click="gotoProfile(profile)"
        >
          <b-card
            :title="profile[1].name"
            bg-variant="secondary"
            text-variant="white"
            class="mb-4 mx-auto"
            style="max-width: 24rem;"
          >
            <b-card-text>{{ profile[1].email }}</b-card-text>
          </b-card>
        </li>
      </b-card-group>
    </div>
    <Cfooter></Cfooter>
  </div>
</template>

<script>
import firebase from "../Authentication/firebase.js";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import logout from "../Authentication/logout.js";
var db = firebase.firestore();

export default {
  props: ["searchedValue"],
  data() {
    return {
      isLoading: true,
      profiles: []
    };
  },
  components: {
    PulseLoader
  },
  methods: {
    logout: logout,
    getProfiles() {
      //this.uid = firebase.auth().currentUser.uid;
      this.uid = this.$store.state.uid;
      db.collection("user")
        .get()
        .then(snapshot => {
          snapshot.docs.forEach(doc => {
            if (this.searchedValue == null) {
              if (doc.id != this.uid) {
                this.profiles.push([doc.id, doc.data()]);
              }
            } else {
              if (
                doc
                  .data()
                  .name.toUpperCase()
                  .includes(this.searchedValue.toUpperCase())
              ) {
                this.profiles.push([doc.id, doc.data()]);
              } else if (
                doc
                  .data()
                  .email.toUpperCase()
                  .includes(this.searchedValue.toUpperCase())
              ) {
                this.profiles.push([doc.id, doc.data()]);
              }
            }
          });
          this.isLoading = false;
        });
    },
    gotoProfile: function(profile) {
      this.$router.push({
        name: "ProfilePage",
        params: { userProfile: profile }
      });
    }
  },

  created: function() {
    this.getProfiles();
  }
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

.ProfileDiv {
  margin-top: 50px;
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
