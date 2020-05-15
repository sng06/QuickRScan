import firebase from "firebase";
import "firebase/storage";

//firebase config here

// Initialize Firebase
firebase.initializeApp(process.env.firebaseConfig);
firebase.analytics();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const firebaseAuth = firebase.auth;
export const db = firebase
  .firestore()
  .settings({ timestampsInSnapshots: true });
export const storage = firebase.storage();
