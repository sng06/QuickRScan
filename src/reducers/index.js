import { combineReducers } from "redux";
import userReducer from "./userReducer";
import textDetectionResultReducer from "./textDetectionResultReducer";

export default combineReducers({
  userStore: userReducer,
  textDetectionResultStore: textDetectionResultReducer,
});
