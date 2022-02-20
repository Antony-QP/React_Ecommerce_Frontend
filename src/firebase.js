  import firebase from 'firebase'
  
  
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCAHeIXTca_AdUeRJThEMwAiiNVPeaZxiA",
    authDomain: "e-commerce-6743f.firebaseapp.com",
    projectId: "e-commerce-6743f",
    storageBucket: "e-commerce-6743f.appspot.com",
    messagingSenderId: "547715542837",
    appId: "1:547715542837:web:3b4d77792ba81d5245267c"
  };
  // Initialize Firebase

  firebase.initializeApp(firebaseConfig); 

  export const auth = firebase.auth()
  export const  googleAuthProvider =  new firebase.auth.GoogleAuthProvider()
