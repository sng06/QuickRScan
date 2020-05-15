import { firebaseAuth, googleProvider } from "config/FirebaseConfig.js";

export function loginWithGoogle() {
  return firebaseAuth().signInWithRedirect(googleProvider);
  // return firebaseAuth().signInWithPopup(googleProvider);
}

export function logout() {
  return firebaseAuth().signOut();
}
