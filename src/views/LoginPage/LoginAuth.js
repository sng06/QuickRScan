import {
  firebaseAuth,
  googleProvider,
  firestore,
} from "config/FirebaseConfig.js";

export function loginWithGoogle() {
  return (
    firebaseAuth()
      // .signInWithPopup(googleProvider)
      .signInWithPopup(
        new firebaseAuth.GoogleAuthProvider().addScope(
          "https://www.googleapis.com/auth/drive"
          // "https://www.googleapis.com/auth/spreadsheets"
        )
      )
      // .then((res) => console.log("googleLogin", res))
      .catch((e) => console.log(e))
  );
}

// export const createUserProfileDocument = async (userAuth) => {
//   console.log("userAuth:", userAuth.user);
//   if (!userAuth) return;

//   // const userReference = firestore.doc(`users/${userAuth.uid}`);
//   const userReference = firestore.collection("users").doc(userAuth.uid);
//   const snapShot = await userReference.get();
//   if (!snapShot.exists) {
//     const { displayName, email, photoURL } = userAuth;
//     const createdAt = new Date();
//     // try {
//     //   await userReference.set({
//     //     displayName,
//     //     email,
//     //     photoURL,
//     //     createdAt,
//     //   });
//     // } catch (error) {
//     //   console.log(error);
//     // }
//     userReference
//       .set({
//         displayName,
//         email,
//         photoURL,
//         createdAt,
//       })
//       .catch((error) => console.log(error));
//   }
//   return userReference;
// };

//use this when deployed
export const createUserProfileDocument = async (res) => {
  console.log("userAuth:", res);
  if (!res.user) return;

  // const userReference = firestore.doc(`users/${userAuth.uid}`);
  const userReference = firestore.collection("users").doc(res.user.uid);
  const snapShot = await userReference.get();
  if (!snapShot.exists) {
    const { displayName, email, photoURL } = res.user;
    // const { accessToken } = res.credential;
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
        // accessToken,
        createdAt,
      })
      .catch((error) => console.log(error));
  }
  return userReference;
};

export function logout() {
  return firebaseAuth().signOut();
}
