import { LOGIN, REGISTER, ERRORS, VERIFY } from "./types";

const initialState = {
  login_user: null,
  register_user: null,
  verify: null,
  loading: true,
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
      let loading = "load";
      if (!token) {
        loading = "loading";
      } else {
        loading = "unload";
      }
      return {
        ...state,
        login_user: action.payload,
        loading,
      };
    case VERIFY:
      return {
        ...state,
        verify: action.payload,
      };
    case ERRORS:
      console.log(action.payload);
      return {
        ...state,
        errors: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
