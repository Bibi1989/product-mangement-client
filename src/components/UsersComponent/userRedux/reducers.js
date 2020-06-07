import { LOGIN, REGISTER, ERRORS, VERIFY, LOADING, LOAD_USER } from "./types";

const initialState = {
  login_user: null,
  register_user: null,
  verify: null,
  user_verify: null,
  isAuthenticated: null,
  loading: false,
  errors: null,
};

const token = JSON.parse(sessionStorage.getItem("token")) || null;

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER:
      return {
        ...state,
        register_user: action.payload,
      };
    case LOGIN:
      return {
        ...state,
        login_user: action.payload,
      };
    case VERIFY:
      return {
        ...state,
        verify: action.payload,
      };
    case LOAD_USER:
      return {
        ...state,
        user_verify: action.payload,
      };
    case ERRORS:
      return {
        ...state,
        errors: action.payload,
      };
    case LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
