import { ADD, FETCHALL, FETCHSINGLE, DELETE, UPDATE, TASK } from "./type";

const initialState = {
  projects: [],
  project: null,
  deleted_project: null,
  updated_project: null,
  added_project: null,
  tasks: null,
  count: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHALL:
      console.log(action.payload);
      const count =
        action.payload !== undefined &&
        action.payload.reduce((a, v) => (a += v.Tasks.length), 0);
      return {
        ...state,
        projects: action.payload,
        count: count,
      };
    case ADD:
      return {
        ...state,
        project: [action.payload, ...state.projects],
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
    case TASK:
      return {
        ...state,
        tasks: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
