import { firebaseAuth } from "config/FirebaseConfig";
import { firestore } from "config/FirebaseConfig";
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
          hist.push("/uploadImage");
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

export const getTextDetectionResult = () => {
  console.log("checking get text detection result action");
  return async (dispatch) => {
    try {
      dispatch(loading());
      firestore
        .collection("results")
        //   .orderBy("createdAtServerTime", "desc")
        .limit(1)
        //   .doc("tYICSAfDcNGBOiRig0nK")
        .onSnapshot((snapshot) => {
          console.log("all snapshot data", snapshot);
          snapshot.forEach((doc) => {
            console.log(
              "doc: ",
              doc.id,
              doc.data(),
              doc.data().textResult.description
            );
            dispatch(loadTextDetectionResult(doc.data()));
            // var newItem = doc.data();
            // newItem.id = doc.id;
            // allData.push(newItem);
            // console.log(JSON.stringify(allData[0]));
          });
        });
    } catch (error) {
      console.log("Error:", error);
    }
  };
};

export const loadTextDetectionResult = (res) => {
  return {
    type: "LOAD_TEXT_DETECTION_RES",
    payload: res,
  };
};

export const loading = () => {
  return {
    type: "LOADING",
  };
};

export const unloadUserData = () => {
  return {
    type: "LOGOUT",
  };
};
