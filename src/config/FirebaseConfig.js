import firebase from "firebase";
import "firebase/storage";

const functions = require("firebase-functions");
let config = require("./env.json");

if (Object.keys(functions.config()).length) {
  config = functions.config();
}

var firebaseConfig = {
  apiKey: config.my.api_key,
  authDomain: config.my.auth_domain,
  databaseURL: config.my.database_url,
  projectId: config.my.project_id,
  storageBucket: config.my.storage_bucket,
  messagingSenderId: config.my.messaging_sender_id,
  appId: config.my.app_id,
  measurementId: config.my.measurement_id,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const firebaseAuth = firebase.auth;
export const firestore = firebase.firestore();
export const storage = firebase.storage();

// google sign in
export const googleProvider = new firebase.auth.GoogleAuthProvider();
