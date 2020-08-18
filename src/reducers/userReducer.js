const initialState = {
  isLoggedIn: false,
  userName: "",
  userEmail: "",
  userProfilePicURL: "",
};

export default function userReducer(state = initialState, action) {
  if (action.type === "USER_LOAD") {
    console.log(
      "checking reducer: ",
      action.payload.id,
      action.payload.data().displayName
    );
    return {
      ...state,
      isLoggedIn: true,
      userName: action.payload.data().displayName,
      userEmail: action.payload.data().email,
      userProfilePicURL: action.payload.data().photoURL,
    };
  }
  if (action.type === "LOGOUT") {
    return {
      isLoggedIn: false,
      userName: "",
      userEmail: "",
      userProfilePicURL: "",
    };
  }
  return state;
}
