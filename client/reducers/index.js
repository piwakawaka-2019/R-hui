import { combineReducers } from "redux";

import auth from "./auth";
import users from "./users";
import rahui from "./rahui"
import iwi from './iwi'
import area from './area'
import coords from './coords'

export default combineReducers({
  auth,
  users,
  rahui,
  iwi,
  area,
  coords
});
