const initialState = {
  isLoggedIn: false,
  userName: "",
  userEmail: "",
  userProfilePicURL: "",
  token: "",
};

export default function userReducer(state = initialState, action) {
  if (action.type === "USER_LOAD") {
    // console.log(
    //   "checking user reducer: ",
    //   action.payload.user.data(),
    //   action.payload.token
    //   // action.payload.data().displayName
    //   // action.payload.data().credential.accessToken
    // );
    return {
      ...state,
      isLoggedIn: true,
      userName: action.payload.user.data().displayName,
      userEmail: action.payload.user.data().email,
      userProfilePicURL: action.payload.user.data().photoURL,
      token: action.payload.token,
    };
  }
  // if (action.type === "LOAD_ACCESS_TOKEN") {
  //   console.log("token: ", action.payload);
  //   return {
  //     ...state,
  //     token: action.payload,
  //   };
  // }
  if (action.type === "LOGOUT") {
    return {
      isLoggedIn: false,
      userName: "",
      userEmail: "",
      userProfilePicURL: "",
      token: "",
    };
  }
  return state;
}
