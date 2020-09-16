import { combineReducers } from "redux";
import Authenticate from "../slices/single/login";
import Main from "../slices/single/main";

export default combineReducers({
  Authenticate: Authenticate,
  Main: Main,
});
