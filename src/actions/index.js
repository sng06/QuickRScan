import { firebaseAuth } from "config/FirebaseConfig";
import { hist } from "../index";
import { createUserProfileDocument } from "views/LoginPage/LoginAuth";

export const loadUserData = () => {
  console.log("loading user data");
  return async (dispatch) => {
    try {
      firebaseAuth().onAuthStateChanged(async (userAuth) => {
        if (userAuth) {
          const user = await createUserProfileDocument(userAuth);
          await user.onSnapshot((snapshot) => {
            dispatch(loadUserInfo(snapshot));
            console.log("checking: ", snapshot);
          });
          hist.push("/content");
        }
      });
    } catch (error) {
      console.log("Error: ", error);
    }
  };
};

export const loadUserInfo = (userInfo) => {
  return {
    type: "USER_LOAD",
    payload: userInfo,
  };
};

export const unloadUserData = () => {
  return {
    type: "LOGOUT",
  };
};
