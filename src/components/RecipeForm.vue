<template>
  <form>
    <label for="recipeName">Name of Recipe: </label>
    <span>&nbsp;{{ recipe.name }}</span>
    <br />
    <span class="alert" v-show="alert.name">Please enter name of recipe. </span>
    <br />

    <input
      class="contriInput"
      type="text"
      id="recipeName"
      name="recipeName"
      v-model="recipe.name"
    />
    <br />

    <label for="cuisine">Cuisine: </label>
    <span>&nbsp;{{ recipe.cuisine }}</span>
    <br />
    <span class="alert" v-show="alert.cuisine"
      >Please enter cuisine of recipe.
    </span>
    <br />

    <input
      class="contriInput"
      type="text"
      id="cuisine"
      name="cuisine"
      v-model="recipe.cuisine"
    />
    <br />

    <label for="difficulty">Difficulty: </label>
    <span>&nbsp;{{ recipe.difficulty }}</span>
    <br />
    <span class="alert" v-show="alert.difficulty"
      >Please select difficulty of recipe.
    </span>
    <br />

    <select
      class="contriInput"
      id="difficulty"
      name="difficulty"
      v-model="recipe.difficulty"
    >
      <option value="Easy">Easy</option>
      <option value="Medium">Medium</option>
      <option value="Hard">Hard</option>
    </select>
    <br />

    <label for="image">ImageURL: (for display purposes)</label>
    <br />
    <span class="alert" v-show="alert.image"
      >Please enter image URL of recipe.
    </span>
    <br />

    <input
      class="contriInput"
      type="text"
      id="image"
      name="image"
      placeholder="Please provide a valid link"
      v-model="recipe.image"
    />
    <br />

    <label for="serving">No. of servings: </label>
    <span>&nbsp;{{ recipe.servings }}</span>
    <br />
    <span class="alert" v-show="alert.servings"
      >Please select serving size of recipe.
    </span>
    <br />

    <select
      class="contriInput"
      id="serving"
      name="serving"
      v-model="recipe.servings"
    >
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
      <option value="6">6</option>
      <option value="7">7</option>
      <option value="8">8</option>
      <option value="9">9</option>
      <option value="10">10</option>
      <option value=">10"> more than 10</option>
    </select>
    <br />

    <label for="time">Duration to make: </label>
    <span>&nbsp;{{ recipe.time }}</span>
    <br />
    <span class="alert" v-show="alert.time"
      >Please select duration to make recipe.
    </span>
    <br />

    <select class="contriInput" id="time" name="time" v-model="recipe.time">
      <option value="less than 30mins">less than 30mins</option>
      <option value="30mins to 1h">30mins to 1h</option>
      <option value="1h to 2h">1h to 2h</option>
      <option value="2h to 3h">2h to 3h</option>
      <option value="3h to 4h">3h to 4h</option>
      <option value="4h to 5h">4h to 5h</option>
      <option value="5h to 6h">5h to 6h</option>
      <option value="6h to 7h">6h to 7h</option>
      <option value="7h to 8h">7h to 8h</option>
      <option value="8h to 9h">8h to 9h</option>
      <option value="9h to 10h">9h to 10h</option>
      <option value="more than 10h">more than 10h</option>
    </select>
    <br />

    <label for="type">Type: </label>
    <span>&nbsp;{{ recipe.type }}</span>
    <br />
    <span class="alert" v-show="alert.type">Please select recipe type. </span>
    <br />

    <select class="contriInput" id="type" name="type" v-model="recipe.type">
      <option value="Main">Main</option>
      <option value="Side">Side</option>
    </select>
    <br />

    <label for="ingredients">Ingredients: </label>
    <button type="button" v-on:click="removeIngre">Clear All</button>
    <br />
    <span class="alert" v-show="alert.ingredients"
      >Please input ingredients of recipe.
    </span>
    <br />

    <div>
      <ul v-for="ingredient in recipe.ingredients" v-bind:key="ingredient">
        <li>
          <span>{{ ingredient }}</span>
        </li>
      </ul>
    </div>
    <br />

    <input
      class="contriInput"
      type="text"
      id="ingredients"
      name="ingredients"
      v-model="ingredient"
    />
    <button type="button" v-on:click="addIngre">Add Ingredient!</button>

    <br />
    <label for="instructions">Instructions: </label>
    <button type="button" v-on:click="removeInstru">Clear All</button>
    <br />
    <span class="alert" v-show="alert.directions"
      >Please input instructions of recipe.
    </span>
    <br />

    <div>
      <ul v-for="instruction in recipe.directions" v-bind:key="instruction">
        <li>
          <span>{{ instruction }}</span>
        </li>
      </ul>
    </div>
    <br />

    <input
      class="contriInput"
      type="text"
      id="instructions"
      name="instructions"
      v-model="instruction"
    />
    <button type="button" v-on:click="addInstru">Add Instruction!</button>
    <br />

    <span class="alert" v-show="alert.submission"
      >Please make sure to fill in every field before submitting!
    </span>
    <br />

    <button type="button" id="submitRecipeButton" v-on:click="submitRecipe">
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
      recipe: {
        cuisine: "",
        difficulty: "",
        directions: [],
        image: "",
        ingredients: [],
        name: "",
        servings: "",
        time: "",
        type: "",
        contributor: "",
      },
      alert: {
        cuisine: false,
        difficulty: false,
        directions: false,
        image: false,
        ingredients: false,
        name: false,
        servings: false,
        time: false,
        type: false,
        submission: false,
      },
      ingredient: "",
      instruction: "",
      id: "",
    };
  },
  methods: {
    addIngre: function() {
      this.recipe.ingredients.push(this.ingredient);
      this.ingredient = "";
    },
    addInstru: function() {
      this.recipe.directions.push(this.instruction);
      this.instruction = "";
    },
    removeIngre: function() {
      this.recipe.ingredients = [];
    },
    removeInstru: function() {
      this.recipe.directions = [];
    },
    submitRecipe: function() {
      this.alert.cuisine = false;
      this.alert.difficulty = false;
      this.alert.directions = false;
      this.alert.image = false;
      this.alert.ingredients = false;
      this.alert.name = false;
      this.alert.servings = false;
      this.alert.time = false;
      this.alert.type = false;
      this.alert.submission = false;
      if (this.recipe.name === "") {
        this.alert.name = true;
        this.alert.submission = true;
      }
      if (this.recipe.cuisine === "") {
        this.alert.cuisine = true;
        this.alert.submission = true;
      }
      if (this.recipe.difficulty === "") {
        this.alert.difficulty = true;
        this.alert.submission = true;
      }
      if (this.recipe.image === "") {
        this.alert.image = true;
        this.alert.submission = true;
      }
      if (this.recipe.servings === "") {
        this.alert.servings = true;
        this.alert.submission = true;
      }
      if (this.recipe.time === "") {
        this.alert.time = true;
        this.alert.submission = true;
      }
      if (this.recipe.type === "") {
        this.alert.type = true;
        this.alert.submission = true;
      }
      if (this.recipe.ingredients.length === 0) {
        this.alert.ingredients = true;
        this.alert.submission = true;
      }
      if (this.recipe.directions.length === 0) {
        this.alert.directions = true;
        this.alert.submission = true;
      }
      if (
        (this.recipe.name &&
          this.recipe.cuisine &&
          this.recipe.difficulty &&
          this.recipe.image &&
          this.recipe.servings &&
          this.recipe.time &&
          this.recipe.type) != "" &&
        (this.recipe.ingredients.length && this.recipe.directions.length) != 0
      ) {
        db.collection("recipe")
          .add(this.recipe)
          .then((doc) => {
            this.id = doc.id;
            db.collection("user")
              .doc(this.$store.state.uid)
              .update({
                contributeRecipe: firebase.firestore.FieldValue.arrayUnion(
                  this.id
                ),
              });
            location.reload();
          });
      }
    },
    getContributor: function() {
      db.collection("user")
        .doc(this.$store.state.uid)
        .get()
        .then((doc) => {
          this.recipe.contributor = doc.data().name;
        });
    },
  },
  created() {
    this.getContributor();
  },
};
</script>

<style>
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

#submitRecipeButton {
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

#submitRecipeButton:hover {
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
