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
    </ul>
    <div>
      <div class="myQuestions starter">
        <h1>Do you prefer cooking or eating out?</h1>
        <div class="button-centraliser">
          <button
            class="myButton"
            name="question1"
            id="Cooking"
            v-on:click="makeSelection('Cooking',0)"
          >Cooking</button>
          <br />
          <button
            class="myButton"
            name="question1"
            id="Eating out"
            v-on:click="makeSelection('Eating out',0)"
          >Eating out</button>
        </div>
      </div>
      <div class="myQuestions">
        <h1>What is your budget?</h1>
        <div class="button-centraliser">
          <button class="myButton" name="question2" v-on:click="makeSelection('$$$',1)" id="$$$">$$$</button>
          <br />
          <button class="myButton" name="question2" v-on:click="makeSelection('$$',1)" id="$$">$$</button>
          <br />
          <button class="myButton" name="question2" v-on:click="makeSelection('$',1)" id="$">$</button>
        </div>
      </div>
      <div class="myQuestions">
        <h1>What is your favourite cuisine?</h1>
        <div class="button-centraliser">
          <button
            class="myButton"
            name="question3"
            v-on:click="makeSelection('Chinese Food',2)"
            id="Chinese Food"
          >Chinese Food</button>
          <br />
          <button
            class="myButton"
            name="question3"
            v-on:click="makeSelection('Italian Food', 2)"
            id="Italian Food"
          >Indian Food</button>
          <br />
          <button
            class="myButton"
            name="question3"
            v-on:click="makeSelection('Singaporean Food', 2)"
            id="Singaporean Food"
          >Western Food</button>
          <br />
          <button
            class="myButton"
            name="question3"
            v-on:click="makeSelection('Thai Food', 2)"
            id="Thai Food"
          >Thai Food</button>
          <br />
          <button
            class="myButton"
            name="question3"
            v-on:click="makeSelection('Western Food', 2)"
            id="Western Food"
          >Viet Food</button>
        </div>
      </div>
      <div class="myQuestions">
        <h1>What is your cooking experience?</h1>
        <div class="button-centraliser">
          <button
            class="myButton"
            name="question4"
            v-on:click="makeSelection('Expert', 3)"
            id="Expert"
          >Expert</button>
          <br />
          <button
            class="myButton"
            name="question4"
            v-on:click="makeSelection('Intermediate', 3)"
            id="Intermediate"
          >Intermediate</button>
          <br />
          <button
            class="myButton"
            name="question4"
            v-on:click="makeSelection('Beginner', 3)"
            id="Beginner"
          >Beginner</button>
        </div>
      </div>
      <div class="myQuestions">
        <h1>However far are you willing to travel?</h1>
        <div class="button-centraliser">
          <button
            class="myButton"
            name="question5"
            v-on:click="makeSelection('2km', 4)"
            id="2km"
          >2km</button>
          <br />
          <button
            class="myButton"
            name="question5"
            v-on:click="makeSelection('5km', 4)"
            id="5km"
          >5km</button>
          <br />
          <button
            class="myButton"
            name="question5"
            v-on:click="makeSelection('10km', 4)"
            id="10km"
          >10km</button>
        </div>
      </div>
      <div class="myQuestions">
        <h1>Complete the questionaire by clicking the submit button!</h1>
        <div class="button-centraliser">
          <button class="myButton" v-on:click="submitQuestionaire()">Submit</button>
        </div>
      </div>
    </div>
    <div class="dot-container">
      <span class="dot active" v-on:click="currentSlide(1)"></span>
      <span class="dot" v-on:click="currentSlide(2)"></span>
      <span class="dot" v-on:click="currentSlide(3)"></span>
      <span class="dot" v-on:click="currentSlide(4)"></span>
      <span class="dot" v-on:click="currentSlide(5)"></span>
      <span class="dot" v-on:click="currentSlide(6)"></span>
      <a class="prev" id="prev" v-on:click="plusSlides(-1)">&#10094;</a>
      <a class="next" id="next" v-on:click="plusSlides(1)">&#10095;</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Preferencing",
  props: {},
  data() {
    return {
      responses: ["", "", "", "", ""],
      numberOfQuestions: 5,
      slideIndex: 1,
      outputValue: 0,
      preferences:[],
    };
  },
  methods: {
    plusSlides: function(n) {
      this.showSlides((this.slideIndex += n));
    },
    currentSlide: function(n) {
      this.showSlides((this.slideIndex = n));
    },
    showSlides: function(n) {
      var i;
      var slides = document.getElementsByClassName("myQuestions");
      var dots = document.getElementsByClassName("dot");
      if (n > slides.length) {
        this.slideIndex = 1;
      }
      if (n < 1) {
        this.slideIndex = slides.length;
      }
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
      }
      slides[this.slideIndex - 1].style.display = "block";
      dots[this.slideIndex - 1].className += " active";
      if (this.slideIndex != 1) {
        document.getElementById("prev").style.display = "block";
      } else {
        document.getElementById("prev").style.display = "none";
      }
      if (this.slideIndex != this.numberOfQuestions + 1) {
        document.getElementById("next").style.display = "block";
      } else {
        document.getElementById("next").style.display = "none";
      }
    },
    makeSelection: function(optionChosen, qnNumber) {
      var i = 0;
      this.responses[qnNumber] = optionChosen;
      var optionsOfQuestion = document.getElementsByName(
        document.getElementById(optionChosen).name
      );
      for (i = 0; i < optionsOfQuestion.length; i++) {
        optionsOfQuestion[i].style.background = "#0088cc";
      }
      document.getElementById(optionChosen).style.background = "#979797";
    },
    preferenceCalculator: function() {
      var ans1 = this.responses[0];
      var ans2 = this.responses[1];
      var ans3 = this.responses[2];
      var ans4 = this.responses[3];
      var ans5 = this.responses[4];
      var Budget = [0, 0, 0, 0];
      var Cooking = [0, 0, 0, 0];
      var EatingOut = [0, 0, 0, 0];
      var Traveling = [0, 0, 0, 0];
      var cuisine = '';
      if (ans1 == "Cooking") {
        Cooking[0] = 10;
        EatingOut[0] = 0;
        Traveling[0] = 5;
        Budget[0] = 5;
      }
      if (ans1 == "Eating out") {
        Cooking[0] = 0;
        EatingOut[0] = 10;
        Traveling[0] = 10;
        Budget[0] = 8;
      }
      if (ans2 == "$$$") {
        Cooking[1] = 5;
        EatingOut[1] = 5;
        Traveling[1] = 8;
        Budget[1] = 10;
      }
      if (ans2 == "$$") {
        Cooking[1] = 5;
        EatingOut[1] = 5;
        Traveling[1] = 5;
        Budget[1] = 5;
      }
      if (ans2 == "$") {
        Cooking[1] = 5;
        EatingOut[1] = 5;
        Traveling[1] = 3;
        Budget[1] = 0;
      }
      if (ans3 == "Chinese Food") {
        cuisine = "Chinese Food";
      }
      if (ans3 == "Italian Food") {
        cuisine = "Italian Food";
      }
      if (ans3 == "Singaporean Food") {
        cuisine = "Singaporean Food";
      }
      if (ans3 == "Thai Food") {
        cuisine = "Thai Food";
      }
      if (ans3 == "Western Food") {
        cuisine = "Western Food";
      }
      if (ans4 == "Expert") {
        Cooking[2] = 10;
        EatingOut[2] = 5;
        Traveling[2] = 5;
        Budget[2] = 5;
      }
      if (ans4 == "Intermediate") {
        Cooking[2] = 5;
        EatingOut[2] = 5;
        Traveling[2] = 5;
        Budget[2] = 5;
      }
      if (ans4 == "Beginner") {
        Cooking[2] = 0;
        EatingOut[2] = 5;
        Traveling[2] = 5;
        Budget[2] = 5;
      }
      if (ans5 == "2km") {
        Cooking[3] = 5;
        EatingOut[3] = 5;
        Traveling[3] = 3;
        Budget[3] = 3;
      }
      if (ans5 == "5km") {
        Cooking[3] = 5;
        EatingOut[3] = 5;
        Traveling[3] = 5;
        Budget[3] = 5;
      }
      if (ans5 == "10km") {
        Cooking[3] = 5;
        EatingOut[3] = 5;
        Traveling[3] = 10;
        Budget[3] = 7;
      }
      
      var compliedList = [0,0,0,0,cuisine];
      for(var i = 0; i < 4;i++){
        compliedList[0] += Cooking[i];
        compliedList[1] += EatingOut[i];
        compliedList[2] += Traveling[i];
        compliedList[3] += Budget[i];
      }
      this.preferences = compliedList;
    },
    submitQuestionaire: function() {
      var checker = true;
      for (var j = 0; j < this.responses.length; j++) {
        if (this.responses[j] == "") {
          checker = false;
        }
      }
      if (!checker) {
        alert("Please answer all required questions!");
      } else {
        this.preferenceCalculator();
        this.$router.push({ name: 'Characteristic', params: {preferences:this.preferences}})
      }
    }
  },
  created: function() {
    this.showSlides(this.slideIndex);
  }
};
</script>

<style>
h1 {
  font-family: Helvetica;
  text-align: center;
  color: black;
  font-size: 50px;
}

.myButton {
  background: #0088cc;
  -webkit-border-radius: 20px;
  -moz-border-radius: 20px;
  border-radius: 8px;
  color: #ffffff;
  font-family: Helvetica;
  font-size: 30px;
  font-weight: 100;
  padding: 14px;
  border: solid #0088cc 1px;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
  text-align: center;
  margin: 20px 10px 20px 10px;
  width: 50%;
}

.dot {
  cursor: pointer;
  height: 15px;
  width: 15px;
  margin: 0 2px;
  background-color: #979797;
  border-radius: 50%;
  display: inline-block;
  transition: background-color 0.6s ease;
}

.active,
.dot:hover {
  background-color: #0088cc;
}

.dot-container {
  text-align: center;
  padding: 30px 20px 20px 20px;
  height: 10%;
}

.myQuestions {
  display: none;
  text-align: center;
  height: 90%;
  padding-top: 10%;
}
.questionContainer {
  display: block;
}
.prev,
.next {
  cursor: pointer;
  position: fixed;
  top: 50%;
  width: auto;
  margin-top: -30px;
  padding: 16px;
  color: #888;
  font-weight: bold;
  font-size: 20px;
  border-radius: 0 3px 3px 0;
  user-select: none;
}

.next {
  position: fixed;
  right: 0;
  border-radius: 3px 0 0 3px;
}
.prev {
  position: fixed;
  left: 0;
  display: none;
}
.prev:hover,
.next:hover {
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
}

.starter {
  display: block;
}
</style>
