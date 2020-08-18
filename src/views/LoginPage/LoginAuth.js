import {
  firebaseAuth,
  googleProvider,
  firestore,
} from "config/FirebaseConfig.js";

export function loginWithGoogle() {
  return firebaseAuth()
    .signInWithPopup(googleProvider)
    .catch((e) => console.log(e));
}

export const createUserProfileDocument = async (userAuth) => {
  if (!userAuth) return;

  // const userReference = firestore.doc(`users/${userAuth.uid}`);
  const userReference = firestore.collection("users").doc(userAuth.uid);
  const snapShot = await userReference.get();
  if (!snapShot.exists) {
    const { displayName, email, photoURL } = userAuth;
    const createdAt = new Date();
    // try {
    //   await userReference.set({
    //     displayName,
    //     email,
    //     photoURL,
    //     createdAt,
    //   });
    // } catch (error) {
    //   console.log(error);
    // }
    userReference
      .set({
        displayName,
        email,
        photoURL,
        createdAt,
      })
      .catch((error) => console.log(error));
  }
  return userReference;
};

// export const loginWithGoogle = () =>
//   firebaseAuth().signInWithPopup(googleProvider);

export function logout() {
  return firebaseAuth().signOut();
}
