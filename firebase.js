import firebase from 'firebase/compat/app';
import "firebase/compat/firestore";
import "firebase/compat/storage";
import "firebase/compat/auth";

//import 'firebase/auth';


var firebaseConfig = {
  apiKey: "AIzaSyDEJqZuHh7AL0rQ4V_rSWUr30zBjvmJn50",
  authDomain: "card-4bbb6.firebaseapp.com",
  projectId: "card-4bbb6",
  storageBucket: "card-4bbb6.appspot.com",
  messagingSenderId: "632865725104",
  appId: "1:632865725104:web:3fb590950da4d844307975",
  measurementId: "G-MBEMGBNJ1Y"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const storage = firebase.storage();
const auth = firebase.auth();



export default {
  firebase,
  db,
  storage,
  auth
};