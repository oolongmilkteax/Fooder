import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyB7afMNTjnftdFYYtpgk7H9ZWOFJC9WdqY",
  authDomain: "fooder-22493.firebaseapp.com",
  projectId: "fooder-22493",
  storageBucket: "fooder-22493.appspot.com",
  messagingSenderId: "504048888414",
  appId: "1:504048888414:web:5a93d68ec6386d3cbda2cf",
  measurementId: "G-CNMHP7C57D",
};

firebase.initializeApp(firebaseConfig);

//var database = firebase.firestore();

export default firebase;
