import { LOGIN, REGISTER, ERRORS, VERIFY } from "./types";

const initialState = {
  login_user: null,
  register_user: null,
  verify: null,
  errors: null,
};

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
    case ERRORS:
      return {
        ...state,
        errors: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
