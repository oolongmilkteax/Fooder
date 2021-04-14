<template>
  <div class="body">
    <Cheader></Cheader>
    <div class="minHeight">
      <b-button v-b-toggle.sidebar-no-header class="FnSbtn">Sort & Filter</b-button>

      <b-sidebar
        id="sidebar-no-header"
        aria-labelledby="sidebar-no-header-title"
        no-header
        shadow
        v-if="cuisines.length != 0"
      >
        <template #default="{ hide }">
          <h1>Sort</h1>
          <a class="dropdown-btn" v-on:click="sort('name')">Name</a>
          <a class="dropdown-btn" v-on:click="sort('cuisine')">Cuisine</a>
          <a class="dropdown-btn" v-on:click="sort('difficulty')">Difficulty</a>
          <a class="dropdown-btn" v-on:click="sort('time')">Time</a>
          <a class="dropdown-btn" v-on:click="sort('type')">Type</a>
          <h1>Filter</h1>
          <button
            class="dropdown-btn"
            v-on:click="showDifficulty()"
            id="filDifficulty"
          >Difficulty &#9660;</button>
          <div class="dropdown-container" id="filDifficultyChoice">
            <a
              class="choiceMade"
              style="cursor:pointer"
              id="Easy"
              v-on:click="uniqueDifficult(['difficulty','Easy']);"
            >Easy</a>
            <br />
            <a
              class="choiceMade"
              style="cursor:pointer"
              id="Medium"
              v-on:click="uniqueDifficult(['difficulty','Medium']);"
            >Medium</a>
            <br />
            <a
              class="choiceMade"
              style="cursor:pointer"
              id="Hard"
              v-on:click="uniqueDifficult(['difficulty','Hard']);"
            >Hard</a>
          </div>

          <button class="dropdown-btn" v-on:click="showCuisine()" id="filCuisine">Cuisine &#9660;</button>
          <div class="dropdown-container" id="filCuisineChoice">
            <div v-for="cuisine in cuisines" v-bind:key="cuisine">
              <a
                class="choiceMade"
                style="cursor:pointer"
                v-bind:id="cuisine"
                v-on:click="uniqueCuisine(['cuisine', cuisine]);"
              >{{cuisine}}</a>
            </div>
          </div>

          <button class="dropdown-btn" v-on:click="showTime()" id="filTime">Time &#9660;</button>

          <div class="dropdown-container" id="filTimeChoice">
            <input
              v-on:change="find()"
              type="range"
              list="tickmarks"
              min="0"
              max="5"
              value="50"
              class="slider"
              id="myRange"
            />
            <br />
            <span>
              <strong>
                Value:
                <span id="demo"></span>
              </strong>
            </span>
          </div>

          <button class="dropdown-btn" v-on:click="showType()" id="filType">Type &#9660;</button>

          <div class="dropdown-container" id="filTypeChoice">
            <a
              class="choiceMade"
              style="cursor:pointer"
              id="Main"
              v-on:click="uniqueType(['type', 'Main']);"
            >Main</a>
            <br />
            <a
              class="choiceMade"
              style="cursor:pointer"
              id="Side"
              v-on:click="uniqueType(['type','Side']);"
            >Side</a>
          </div>

          <b-button id="submit" v-on:click="filtering" class="ApplyButton">Apply Filter</b-button>
          <b-button class="closeSidebtn" block @click="hide">Close Sidebar</b-button>
        </template>
      </b-sidebar>
      <br />
      <br />

      <div class="borderDiv">
        <PulseLoader id="loading" color="#0088cc" :loading="isLoading"></PulseLoader>
        <h1 style="margin-top:100px" v-if="noResult">No results for your search.</h1>
        <div class="RecipeContainer">
          <div id="Recipe">
            <ul id="BriefDescription">
              <li id="list" v-for="recipe in recipes" v-bind:key="recipe.name">
                <div class="card" style="width: 23rem;">
                  <img
                    class="img"
                    v-bind:src="recipe[1].image"
                    onerror="this.onerror=null;this.src='https://s3-ap-southeast-1.amazonaws.com/itask-dev/task/not_available.png'"
                    height="20px"
                  />
                  <div class="card-body">
                    <h5 class="name">{{recipe[1].name}}</h5>
                    <div id="Description">
                      <span>Cuisine: {{recipe[1].cuisine}}</span>
                      <br />
                      <span>Type: {{recipe[1].type}}</span>
                      <br />
                      <span>Difficulty: {{recipe[1].difficulty}}</span>
                      <br />
                      <span>Number of servings: {{recipe[1].servings}}</span>
                      <br />
                      <span>Total preparation time: {{recipe[1].time}}</span>
                    </div>
                    <div id="buttons">
                      <button
                        id="beginCookingButton"
                        v-on:click="go(recipe[1].name,recipe[1].ingredients, recipe[1].directions);"
                      >Begin Cooking!</button>
                      <button
                        v-if="favRecipeCheck(recipe[0])"
                        v-on:click="unfav(recipe[0])"
                        id="fav"
                      >
                        <img
                          src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678087-heart-512.png"
                        />
                      </button>
                      <button
                        v-if="!favRecipeCheck(recipe[0])"
                        v-on:click="fav(recipe[0])"
                        id="unfav"
                      >
                        <img
                          src="https://uxwing.com/wp-content/themes/uxwing/download/15-healthcare-and-medical/heart-black.png"
                        />
                      </button>
                    </div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <span id="credits">Contributed by: {{recipe[1].contributor}}</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <Cfooter></Cfooter>
  </div>
</template>

<script>
import logout from "../Authentication/logout.js";
import firebase from "../Authentication/firebase.js";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";

var db = firebase.firestore();

export default {
  props: ["searchedValue"],
  data() {
    return {
      isLoading: true,
      recipes: [],
      favRecipe: [],
      timeValue: "",
      save: [],
      difficultyChoice: [],
      cuisineChoice: [],
      typeChoice: [],
      cuisines: [],
      noResult: false
    };
  },

  components: {
    PulseLoader
  },

  methods: {
    logout: logout,
    fetchItems: function() {
      db.collection("recipe")
        .get()
        .then(snapshot => {
          snapshot.docs.forEach(doc => {
            //if empty search return all
            //this.save.push([doc.id,doc.data()]);
            if (this.searchedValue == null) {
              this.recipes.push([doc.id, doc.data()]);
              this.save.push([doc.id, doc.data()]);
              if (!this.cuisines.includes(doc.data()["cuisine"])) {
                this.cuisines.push(doc.data()["cuisine"]);
              }
            } else {
              //if search contain name return recipe
              if (
                doc
                  .data()
                  .name.toUpperCase()
                  .includes(this.searchedValue.toUpperCase())
              ) {
                this.recipes.push([doc.id, doc.data()]);
                this.save.push([doc.id, doc.data()]);
                if (!this.cuisines.includes(doc.data()["cuisine"])) {
                  this.cuisines.push(doc.data()["cuisine"]);
                }
              } else if (
                doc
                  .data()
                  .cuisine.toUpperCase()
                  .includes(this.searchedValue.toUpperCase())
              ) {
                this.recipes.push([doc.id, doc.data()]);
                this.save.push([doc.id, doc.data()]);
                if (!this.cuisines.includes(doc.data()["cuisine"])) {
                  this.cuisines.push(doc.data()["cuisine"]);
                }
              } else if (
                doc
                  .data()
                  .difficulty.toUpperCase()
                  .includes(this.searchedValue.toUpperCase())
              ) {
                this.recipes.push([doc.id, doc.data()]);
                this.save.push([doc.id, doc.data()]);
                if (!this.cuisines.includes(doc.data()["cuisine"])) {
                  this.cuisines.push(doc.data()["cuisine"]);
                }
              } else if (
                doc
                  .data()
                  .contributor.toUpperCase()
                  .includes(this.searchedValue.toUpperCase())
              ) {
                this.recipes.push([doc.id, doc.data()]);
                this.save.push([doc.id, doc.data()]);
                if (!this.cuisines.includes(doc.data()["cuisine"])) {
                  this.cuisines.push(doc.data()["cuisine"]);
                }
              } else if (
                doc
                  .data()
                  .type.toUpperCase()
                  .includes(this.searchedValue.toUpperCase())
              ) {
                this.recipes.push([doc.id, doc.data()]);
                this.save.push([doc.id, doc.data()]);
                if (!this.cuisines.includes(doc.data()["cuisine"])) {
                  this.cuisines.push(doc.data()["cuisine"]);
                }
              }
            }
          });
          if (this.recipes.length == 0) {
            this.noResult = true;
          }
          this.isLoading = false;
        });
    },

    sort: function(input) {
      if (this.searchedValue != null) {
        if (input == "difficulty") {
          var easy = [];
          var medium = [];
          var hard = [];
          for (var i = 0; i < this.recipes.length; i++) {
            if (this.recipes[i][1]["difficulty"] == "Easy") {
              easy.push(this.recipes[i]);
            } else if (this.recipes[i][1]["difficulty"] == "Medium") {
              medium.push(this.recipes[i]);
            } else {
              hard.push(this.recipes[i]);
            }
          }
          this.recipes = [];
          for (i = 0; i < easy.length; i++) {
            this.recipes.push(easy[i]);
          }
          for (i = 0; i < medium.length; i++) {
            this.recipes.push(medium[i]);
          }
          for (i = 0; i < hard.length; i++) {
            this.recipes.push(hard[i]);
          }
        } else if (input == "time") {
          var shortest = [];
          var two = [];
          var three = [];
          var four = [];
          var five = [];
          var six = [];
          var seven = [];
          var eight = [];
          var nine = [];
          var ten = [];
          var eleven = [];
          var longest = [];
          for (i = 0; i < this.recipes.length; i++) {
            if (this.recipes[i][1]["time"] == "less than 30mins") {
              shortest.push(this.recipes[i]);
            } else if (this.recipes[i][1]["time"] == "30mins to 1h") {
              two.push(this.recipes[i]);
            } else if (this.recipes[i][1]["time"] == "1h to 2h") {
              three.push(this.recipes[i]);
            } else if (this.recipes[i][1]["time"] == "2h to 3h") {
              four.push(this.recipes[i]);
            } else if (this.recipes[i][1]["time"] == "3h to 4h") {
              five.push(this.recipes[i]);
            } else if (this.recipes[i][1]["time"] == "4h to 5h") {
              six.push(this.recipes[i]);
            } else if (this.recipes[i][1]["time"] == "5h to 6h") {
              seven.push(this.recipes[i]);
            } else if (this.recipes[i][1]["time"] == "6h to 7h") {
              eight.push(this.recipes[i]);
            } else if (this.recipes[i][1]["time"] == "7h to 8h") {
              nine.push(this.recipes[i]);
            } else if (this.recipes[i][1]["time"] == "8h to 9h") {
              ten.push(this.recipes[i]);
            } else if (this.recipes[i][1]["time"] == "9h to 10h") {
              eleven.push(this.recipes[i]);
            } else {
              longest.push(this.recipes[i]);
            }
          }
          this.recipes = [];
          for (i = 0; i < shortest.length; i++) {
            this.recipes.push(shortest[i]);
          }
          for (i = 0; i < two.length; i++) {
            this.recipes.push(two[i]);
          }
          for (i = 0; i < three.length; i++) {
            this.recipes.push(three[i]);
          }
          for (i = 0; i < four.length; i++) {
            this.recipes.push(four[i]);
          }
          for (i = 0; i < five.length; i++) {
            this.recipes.push(five[i]);
          }
          for (i = 0; i < six.length; i++) {
            this.recipes.push(six[i]);
          }
          for (i = 0; i < seven.length; i++) {
            this.recipes.push(seven[i]);
          }
          for (i = 0; i < eight.length; i++) {
            this.recipes.push(eight[i]);
          }
          for (i = 0; i < nine.length; i++) {
            this.recipes.push(nine[i]);
          }
          for (i = 0; i < ten.length; i++) {
            this.recipes.push(ten[i]);
          }
          for (i = 0; i < eleven.length; i++) {
            this.recipes.push(eleven[i]);
          }
          for (i = 0; i < longest.length; i++) {
            this.recipes.push(longest[i]);
          }
        } else {
          var newList = [];
          var sortValues = [];
          for (i = 0; i < this.recipes.length; i++) {
            sortValues.push(this.recipes[i][1][input]);
          }
          sortValues.sort();
          var count = 0;
          for (i = 0; i < this.recipes.length; i++) {
            for (var j = 0; j < this.recipes.length; j++) {
              if (sortValues[count] == this.recipes[j][1][input]) {
                newList.push(this.recipes[j]);
                count += 1;
                this.recipes.splice(j, 1);
                i--;
                j--;
                break;
              }
            }
          }
          this.recipes = newList;
        }
      } else {
        this.recipes = [];
        if (input == "difficulty") {
          db.collection("recipe")
            .get()
            .then(snapshot => {
              var easy = [];
              var medium = [];
              var hard = [];
              snapshot.docs.forEach(doc => {
                if (doc.data()["difficulty"] == "Easy") {
                  easy.push([doc.id, doc.data()]);
                } else if (doc.data()["difficulty"] == "Medium") {
                  medium.push([doc.id, doc.data()]);
                } else {
                  hard.push([doc.id, doc.data()]);
                }
              });
              for (var i = 0; i < easy.length; i++) {
                this.recipes.push(easy[i]);
              }
              for (i = 0; i < medium.length; i++) {
                this.recipes.push(medium[i]);
              }
              for (i = 0; i < hard.length; i++) {
                this.recipes.push(hard[i]);
              }
            });
        } else if (input == "time") {
          db.collection("recipe")
            .get()
            .then(snapshot => {
              var shortest = [];
              var two = [];
              var three = [];
              var four = [];
              var five = [];
              var six = [];
              var seven = [];
              var eight = [];
              var nine = [];
              var ten = [];
              var eleven = [];
              var longest = [];
              snapshot.docs.forEach(doc => {
                if (doc.data()["time"] == "less than 30mins") {
                  shortest.push([doc.id, doc.data()]);
                } else if (doc.data()["time"] == "30mins to 1h") {
                  two.push([doc.id, doc.data()]);
                } else if (doc.data()["time"] == "1h to 2h") {
                  three.push([doc.id, doc.data()]);
                } else if (doc.data()["time"] == "2h to 3h") {
                  four.push([doc.id, doc.data()]);
                } else if (doc.data()["time"] == "3h to 4h") {
                  five.push([doc.id, doc.data()]);
                } else if (doc.data()["time"] == "4h to 5h") {
                  six.push([doc.id, doc.data()]);
                } else if (doc.data()["time"] == "5h to 6h") {
                  seven.push([doc.id, doc.data()]);
                } else if (doc.data()["time"] == "6h to 7h") {
                  eight.push([doc.id, doc.data()]);
                } else if (doc.data()["time"] == "7h to 8h") {
                  nine.push([doc.id, doc.data()]);
                } else if (doc.data()["time"] == "8h to 9h") {
                  ten.push([doc.id, doc.data()]);
                } else if (doc.data()["time"] == "9h to 10h") {
                  eleven.push([doc.id, doc.data()]);
                } else {
                  longest.push([doc.id, doc.data()]);
                }
              });
              for (var i = 0; i < shortest.length; i++) {
                this.recipes.push(shortest[i]);
              }
              for (i = 0; i < two.length; i++) {
                this.recipes.push(two[i]);
              }
              for (i = 0; i < three.length; i++) {
                this.recipes.push(three[i]);
              }
              for (i = 0; i < four.length; i++) {
                this.recipes.push(four[i]);
              }
              for (i = 0; i < five.length; i++) {
                this.recipes.push(five[i]);
              }
              for (i = 0; i < six.length; i++) {
                this.recipes.push(six[i]);
              }
              for (i = 0; i < seven.length; i++) {
                this.recipes.push(seven[i]);
              }
              for (i = 0; i < eight.length; i++) {
                this.recipes.push(eight[i]);
              }
              for (i = 0; i < nine.length; i++) {
                this.recipes.push(nine[i]);
              }
              for (i = 0; i < ten.length; i++) {
                this.recipes.push(ten[i]);
              }
              for (i = 0; i < eleven.length; i++) {
                this.recipes.push(eleven[i]);
              }
              for (i = 0; i < longest.length; i++) {
                this.recipes.push(longest[i]);
              }
            });
        } else {
          db.collection("recipe")
            .orderBy(input)
            .get()
            .then(snapshot => {
              snapshot.docs.forEach(doc => {
                this.recipes.push([doc.id, doc.data()]);
              });
            });
        }
      }
    },

    uniqueDifficult: function(option) {
      if (this.difficultyChoice.length == 0) {
        this.difficultyChoice.push(option);
        document.getElementById(option[1]).style.color = "Red";
      } else {
        for (var i = 0; i < this.difficultyChoice.length; i++) {
          if (option[1] == this.difficultyChoice[i][1]) {
            this.difficultyChoice.splice(i, 1);
            document.getElementById(option[1]).style.color = "#007bff";
            break;
          }
          if (i == this.difficultyChoice.length - 1) {
            this.difficultyChoice.push(option);
            document.getElementById(option[1]).style.color = "Red";
            break;
          }
        }
      }
    },
    uniqueCuisine: function(option) {
      if (this.cuisineChoice.length == 0) {
        this.cuisineChoice.push(option);
        document.getElementById(option[1]).style.color = "Red";
      } else {
        for (var i = 0; i < this.cuisineChoice.length; i++) {
          if (option[1] == this.cuisineChoice[i][1]) {
            this.cuisineChoice.splice(i, 1);
            document.getElementById(option[1]).style.color = "#007bff";
            break;
          }
          if (i == this.cuisineChoice.length - 1) {
            this.cuisineChoice.push(option);
            document.getElementById(option[1]).style.color = "Red";
            break;
          }
        }
      }
    },
    uniqueType: function(option) {
      if (this.typeChoice.length == 0) {
        this.typeChoice.push(option);
        document.getElementById(option[1]).style.color = "Red";
      } else {
        for (var i = 0; i < this.typeChoice.length; i++) {
          if (option[1] == this.typeChoice[i][1]) {
            this.typeChoice.splice(i, 1);
            document.getElementById(option[1]).style.color = "#007bff";
            break;
          }
          if (i == this.typeChoice.length - 1) {
            this.typeChoice.push(option);
            document.getElementById(option[1]).style.color = "Red";
            break;
          }
        }
      }
    },

    filtering: function() {
      this.recipes = [...this.save];
      var newList = [];
      if (this.difficultyChoice.length > 0) {
        for (var i = 0; i < this.recipes.length; i++) {
          for (var j = 0; j < this.difficultyChoice.length; j++) {
            if (
              this.recipes[i][1][this.difficultyChoice[j][0]] ==
              this.difficultyChoice[j][1]
            ) {
              newList.push(this.recipes[i]);
              break;
            }
          }
        }
        this.recipes = newList;
        newList = [];
      }

      if (this.cuisineChoice.length) {
        for (i = 0; i < this.recipes.length; i++) {
          for (j = 0; j < this.cuisineChoice.length; j++) {
            if (
              this.recipes[i][1][this.cuisineChoice[j][0]] ==
              this.cuisineChoice[j][1]
            ) {
              newList.push(this.recipes[i]);
              break;
            }
          }
        }
        this.recipes = newList;
        newList = [];
      }

      if (this.typeChoice.length) {
        for (i = 0; i < this.recipes.length; i++) {
          for (j = 0; j < this.typeChoice.length; j++) {
            if (
              this.recipes[i][1][this.typeChoice[j][0]] == this.typeChoice[j][1]
            ) {
              newList.push(this.recipes[i]);
              break;
            }
          }
        }
        this.recipes = newList;
        newList = [];
      }

      if (this.timeValue != "") {
        for (i = 0; i < this.recipes.length; i++) {
          if (this.recipes[i][1]["time"] == this.timeValue) {
            newList.push(this.recipes[i]);
          }
        }
        this.recipes = newList;
        newList = [];
      }
    },

    find: function() {
      var slider = document.getElementById("myRange");
      var output = document.getElementById("demo");
      var values = [
        "",
        "less than 30mins",
        "30mins to 1h",
        "1h to 2h",
        "2h to 3h",
        "3h to 4h"
      ];
      output.innerHTML = values[slider.value];
      this.timeValue = values[slider.value];
    },

    go: function(name, ingredients, directions) {
      this.$router.push({
        name: "FullRecipe",
        params: {
          n: name,
          i: ingredients,
          d: directions,
          searchedValue: this.searchedValue
        }
      });
    },
    getFavourites: function() {
      db.collection("user")
        .doc(this.$store.state.uid)
        .get()
        .then(doc => {
          this.favRecipe = doc.data().favRecipe;
        });
    },
    favRecipeCheck: function(id) {
      return this.favRecipe.includes(id);
    },
    unfav: function(id) {
      var index = this.favRecipe.indexOf(id);
      this.favRecipe.splice(index, 1);
      db.collection("user")
        .doc(this.$store.state.uid)
        .update({
          favRecipe: firebase.firestore.FieldValue.arrayRemove(id)
        });
    },
    fav: function(id) {
      this.favRecipe.push(id);
      db.collection("user")
        .doc(this.$store.state.uid)
        .update({
          favRecipe: firebase.firestore.FieldValue.arrayUnion(id)
        });
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

    showDifficulty: function() {
      if (
        document.getElementById("filDifficultyChoice").style.display === "block"
      ) {
        document.getElementById("filDifficultyChoice").style.display = "none";
      } else {
        document.getElementById("filDifficultyChoice").style.display = "block";
      }
    },
    showCuisine: function() {
      if (
        document.getElementById("filCuisineChoice").style.display === "block"
      ) {
        document.getElementById("filCuisineChoice").style.display = "none";
      } else {
        document.getElementById("filCuisineChoice").style.display = "block";
      }
    },
    showTime: function() {
      if (document.getElementById("filTimeChoice").style.display === "block") {
        document.getElementById("filTimeChoice").style.display = "none";
      } else {
        document.getElementById("filTimeChoice").style.display = "block";
      }
    },
    showType: function() {
      if (document.getElementById("filTypeChoice").style.display === "block") {
        document.getElementById("filTypeChoice").style.display = "none";
      } else {
        document.getElementById("filTypeChoice").style.display = "block";
      }
    },
    imgError: function(image) {
      console.log(image);
      image.onerror = "";
      image.src =
        "https://s3-ap-southeast-1.amazonaws.com/itask-dev/task/not_available.png";
    }
  },
  created() {
    this.fetchItems();
    this.getFavourites();
  }
};
</script>

<style scoped>
#Description {
  line-height: 20px;
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
  bottom: 50px;
}

.RecipeContainer {
  width: 100%;
}

#list {
  border: none;
}

#beginCookingButton {
  background: #0088cc;
  width: 190px;
  border-radius: 8px;
  color: #ffffff;
  font-family: Helvetica;
  font-size: 18px;
  font-weight: 100;
  padding: 20px;
  border: solid #0088cc 1px;
  transform: translate(0px, 10px);
}

#beginCookingButton:hover {
  border: solid #979797 1px;
  background: #979797;
  -webkit-border-radius: 20px;
  -moz-border-radius: 14px;
  border-radius: 8px;
  text-decoration: none;
  cursor: pointer;
}

#loading {
  min-height: 30em;
  align-items: center;
  display: flex;
  justify-content: center;
}

#credits {
  float: right;
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
  transform: translate(0px, 10px);
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
  transform: translate(0px, 10px);
}

#unfav:hover {
  cursor: pointer;
}

.sidenav {
  height: 100%;
  width: 0;
  position: absolute;
  z-index: 1;
  top: 140px;
  left: 0;
  background-color: #111;
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

#submit:hover {
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
  transition: margin-left 0.5s;
  padding: 16px;
}

.closeSidebtn {
  width: 93%;
  margin-left: 10px;
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
.choiceMade:hover {
  color: #2d4fac;
}
.ApplyButton {
  margin: 10px;
}

.FnSbtn {
  margin: 60px;
  padding: 10px 50px 10px 50px;
}

.active {
  background-color: #0088cc;
  color: white;
}

.dropdown-container {
  display: none;
  padding-left: 8px;
}

.minHeight {
  min-height: 56%;
}
</style>



