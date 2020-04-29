import { combineReducers } from "redux";
import userReducer from "../components/UsersComponent/userRedux/reducers";
import projectReducer from "../components/Dashboard/ProjectReducer/reducer";

const appReducer = combineReducers({
  user: userReducer,
  project: projectReducer,
});

export default appReducer;
