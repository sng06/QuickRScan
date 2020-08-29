import { firebaseAuth } from "config/FirebaseConfig";
import { firestore } from "config/FirebaseConfig";
import { hist } from "../index";
import { createUserProfileDocument } from "views/LoginPage/LoginAuth";
import { loginWithGoogle } from "views/LoginPage/LoginAuth";
import { updateSheetValue } from "googleAPI/Sheets";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// export const loadUserData = () => {
//   console.log("loading user data");
//   return async (dispatch) => {
//     try {
//       firebaseAuth().onAuthStateChanged(async (userAuth) => {
//         if (userAuth) {
//           const user = await createUserProfileDocument(userAuth);
//           await user.onSnapshot((snapshot) => {
//             dispatch(loadUserInfo(snapshot));
//             console.log("checking: ", snapshot);
//           });
//           hist.push("/uploadImage");
//         }
//       });
//     } catch (error) {
//       console.log("Error: ", error);
//     }
//   };
// };

// export const handleGoogleLogin = () => {
//   return async (dispatch) => {
//     try {
//       const res = await loginWithGoogle();
//       // this.props.loadAccessToken(res.credential.accessToken);
//       dispatch(loadUserData(res));
//     } catch (err) {
//       console.log(err);
//       toast.error("Failed to login with Google", {
//         position: toast.POSITION.TOP_CENTER,
//         autoClose: 2000,
//       });
//     }
//   };
// };

export const loadUserData = (res) => {
  // console.log("loading user data with res", res);
  return async (dispatch) => {
    try {
      // firebaseAuth().onAuthStateChanged(async (userAuth) => {
      // if (userAuth) {
      const user = await createUserProfileDocument(res);
      await user.onSnapshot((snapshot) => {
        const userData = {
          user: snapshot,
          token: res.credential.accessToken,
        };
        dispatch(loadUserInfo(userData));
      });
      hist.push("/uploadImage");
      // }
      // });
    } catch (error) {
      console.log("Error: ", error);
      toast.error("Failed to load user data to firestore!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
  };
};

export const loadUserInfo = (userData) => {
  return {
    type: "USER_LOAD",
    payload: userData,
  };
};

// export const loadAccessToken = (token) => {
//   return {
//     type: "LOAD_ACCESS_TOKEN",
//     payload: token,
//   };
// };

export const getTextDetectionResult = () => {
  // console.log("checking get text detection result action");
  return async (dispatch) => {
    try {
      dispatch(loading());
      firestore
        .collection("results")
        .orderBy("createdAtServerTime", "desc")
        .limit(1)
        .onSnapshot((snapshot) => {
          // console.log("all snapshot data", snapshot);
          snapshot.forEach((doc) => {
            // console.log(
            //   "doc: ",
            //   doc.id
            //   // doc.data(),
            //   // doc.data().textResult.description
            // );
            dispatch(loadTextDetectionResult(doc.data()));
            // var newItem = doc.data();
            // newItem.id = doc.id;
            // allData.push(newItem);
            // console.log(JSON.stringify(allData[0]));
          });
        });
    } catch (error) {
      console.log("Error:", error);
      toast.error("Failed to get image and detected text result!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
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

// export const getDriveFiles = async (token) => {
//   return getAllFiles(token)
//     .then((response) => response.json())
//     .then((files) => console.log("App.js | files", files));
// };

const processInput = (category, sheetRowNum) => {
  switch (category) {
    case "Advertising":
      return `H${sheetRowNum}`;
    case "Commission":
      return `I${sheetRowNum}`;
    case "Computer Expense":
      return `J${sheetRowNum}`;
    case "Courier & Postage":
      return `K${sheetRowNum}`;
    case "Insurance":
      return `L${sheetRowNum}`;
    case "License, fees, dues":
      return `M${sheetRowNum}`;
    case "Meals & Entertainment":
      return `N${sheetRowNum}`;
    case "Office":
      return `O${sheetRowNum}`;
    case "Professional Development":
      return `P${sheetRowNum}`;
    case "Professional Fees (Legal & Accounting)":
      return `Q${sheetRowNum}`;
    case "Rent":
      return `R${sheetRowNum}`;
    case "Subcontractors":
      return `S${sheetRowNum}`;
    case "Supplies":
      return `T${sheetRowNum}`;
    case "Telephone":
      return `U${sheetRowNum}`;
    case "Travel":
      return `V${sheetRowNum}`;
    case "Utilities":
      return `W${sheetRowNum}`;
    case "Vehicle - Gas":
      return `X${sheetRowNum}`;
    case "Vehicle - Insurance":
      return `Y${sheetRowNum}`;
    case "Vehicle - Lease":
      return `Z${sheetRowNum}`;
    case "Vehicle - Parking":
      return `AA${sheetRowNum}`;
    case "Vehicle -R & M":
      return `AB${sheetRowNum}`;
  }
};

// export const updateSheetData = async (
//   token,
//   category,
//   sheetRowNum,
//   description,
//   date,
//   grossAmount,
//   gst,
//   total
// ) => {
//   if (token) {
//     const selectedCellforTotal = await processInput(category, sheetRowNum);
//     return updateSheetValue(
//       token,
//       sheetRowNum,
//       selectedCellforTotal,
//       description,
//       date,
//       grossAmount,
//       gst,
//       total
//     )
//       .then(() => {
//         console.log("App.js | value updated in Spreadsheet");
//       })
//       .catch((error) => {
//         console.log("App.js | ", "ERROR updating value", error);
//       });
//   } else {
//     console.log(
//       "App.js 72 | No sheetId or Token, please generate them with the buttons before updating the sheet"
//     );
//   }
// };

export const updateSheetData = (
  token,
  category,
  sheetRowNum,
  description,
  date,
  grossAmount,
  gst,
  total
) => {
  if (token) {
    return async () => {
      try {
        const selectedCellforTotal = await processInput(category, sheetRowNum);
        // console.log("check cell: ", selectedCellforTotal);
        // console.log(
        //   "check fields: ",
        //   token,
        //   category,
        //   sheetRowNum,
        //   description,
        //   date,
        //   grossAmount,
        //   gst,
        //   total
        // );
        const res = await updateSheetValue(
          token,
          sheetRowNum,
          selectedCellforTotal,
          description,
          date,
          grossAmount,
          gst,
          total
        );
        console.log("Updated sheet success: ", res);
        toast.success("Google sheet is updated successfully!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
        hist.push("/uploadImage");
      } catch (error) {
        console.log("Error in updating sheets: ", error);
        toast.error("Failed to update Google sheet!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
      }
    };
  } else {
    console.log("No token, please generate them before updating the sheet!");
    toast.error("No token, please generate them before updating the sheet", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });
  }
};
