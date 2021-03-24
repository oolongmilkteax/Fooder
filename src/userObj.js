import firebase from "./firebase.js";

export function getUid() {
  var user = firebase.auth().currentUser;
  var uid = user.uid;
  return uid;
}

export function getUserEmail() {
  var user = firebase.auth().currentUser;
  var userEmail = user.email;
  return userEmail;
}

/* not working 
export function getUserName() {
  var user = firebase.auth().currentUser;
  var name = user.displayName;
  return name;
}
*/

//  this function should ONLY be called upon signup
export function makeUser(uid) {
  var docData = {
    contributeRecipe: [],
    contributeRestaurant: [],
    favRecipe: [],
    favRestaurant: [],
    email: getUserEmail(),
  };
  firebase
    .firestore()
    .collection("user")
    .doc(uid)
    .set(docData);
}
