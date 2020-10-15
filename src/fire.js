import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyAazdBGuoz7P9rbcq4_Dt8HnXvVKjggKbs",
    authDomain: "instastealer-79c93.firebaseapp.com",
    databaseURL: "https://instastealer-79c93.firebaseio.com",
    projectId: "instastealer-79c93",
    storageBucket: "instastealer-79c93.appspot.com",
    messagingSenderId: "198993598834",
    appId: "1:198993598834:web:45e7724988439223e925eb",
    measurementId: "G-EFHFFJE9KL"
  };

 const fire = firebase.initializeApp(firebaseConfig);

 export default fire