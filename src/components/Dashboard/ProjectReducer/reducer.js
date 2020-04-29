import { ADD, FETCHALL, FETCHSINGLE, DELETE, UPDATE } from "./type";

const initialState = {
  projects: [],
  project: null,
  deleted_project: null,
  updated_project: null,
  added_project: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHALL:
      return {
        ...state,
        projects: action.payload,
      };
    case ADD:
      return {
        ...state,
        added_project: action.payload,
      };
    case FETCHSINGLE:
      return {
        ...state,
        project: action.payload,
      };
    case UPDATE:
      return {
        ...state,
        updated_project: action.payload,
      };
    case DELETE:
      return {
        ...state,
        deleted_project: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
