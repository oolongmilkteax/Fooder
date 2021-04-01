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
    <div class="profileBorder">
      <h1 style="text-align:center" v-if="contriRecipes!=''">Contributed Recipes</h1>
        <ul id="BriefDescription">
        <li id="list" v-for="recipe in recipes" v-bind:key="recipe">
          <h2>{{recipe.name}}</h2>
          <img v-bind:src="recipe.image" alt="Food image" />
          <br />
          <br />
          <br />
        </li>
        </ul>
        <h1 style="text-align:center" v-if="contriRestaurants!=''">Contributed Restaurants</h1>
        <ul id="BriefDescription">
        <li id="list" v-for="restaurant in restaurants" v-bind:key="restaurant">
          <h2>{{restaurant.name}}</h2>
          <img v-bind:src="restaurant.image" alt="Restaurant image" />
          <br />
          <br />
          <br />
        </li>
        </ul>
    </div>
  </div>
</template>

<script>
import db from '../firebase.js';

export default {
    props: ['user'],
    data(){
        return{
            contriRestaurants:[],
            contriRecipes:[],
            uid:"",
            restaurants:[],
            recipes:[]
        };
    },
    methods: {
      fetchInfo: function(){
        if(this.user == null){
          this.uid = db.auth().currentUser.uid
          db.firestore().collection('user').doc(this.uid).get().then(user =>{
          this.contriRecipes = user.data().contributeRecipe;
          this.contriRestaurants = user.data().contributeRestaurant;
          this.fetchRecipes();
          this.fetchRestaurants(this.uid);
        });
        }else{
          this.uid = this.user[0];
          this.name = this.user[1].name;
          this.email = this.user[1].email;
          this.contriRecipes = this.user[1].contributeRecipe;
          this.contriRestaurants = this.user[1].contributeRestaurant;
          console.log(this.contriRecipes);
          console.log(this.contriRestaurants);
          this.fetchRecipes();
          this.fetchRestaurants(this.uid);
        }
      },
      fetchRecipes: function(){
        db.firestore()
        .collection("recipe")
        .get()
        .then(snapshot => {
          snapshot.docs.forEach(doc => {
            
            if (this.contriRecipes.includes(doc.id)) {
              this.recipes.push(doc.data())
            }

          });
        });
      },
      fetchRestaurants: function(){
        db.firestore()
        .collection("restaurant")
        .get()
        .then(snapshot => {
          snapshot.docs.forEach(doc => {
            if (this.contriRestaurants.includes(doc.id)) {
              this.restaurants.push(doc.data())
            }
          });
        });
      },
    },
    created: function(){
      this.fetchInfo();
    },
}
</script>

<style>

.profileBorder{
  width: 100%;
  padding-right: 20px;
}


#list {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 5px;
  border: 1px solid #222;
  margin: 10px;
  list-style-type: none;
}

#BriefDescription {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  line-height: 5px;
}

img {
  width: 370px;
  height: 370px;
}

</style>