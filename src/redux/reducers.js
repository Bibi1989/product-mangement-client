import { combineReducers } from "redux";
import userReducer from "../components/UsersComponent/userRedux/reducers";

const appReducer = combineReducers({
  user: userReducer,
});

export default appReducer;
