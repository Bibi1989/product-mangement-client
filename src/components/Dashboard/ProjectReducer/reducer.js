import {
  ADD,
  FETCHALL,
  FETCHSINGLE,
  DELETE,
  UPDATE,
  TASK,
  ADD_TASK,
  DELETE_TASK,
  UPDATE_TASK,
  SINGLE_TASK,
} from "./type";

const initialState = {
  projects: [],
  project: null,
  deleted_project: null,
  updated_project: null,
  added_project: null,
  tasks: null,
  delete_task: null,
  update_task: [],
  single_task: null,
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
        projects: [action.payload, ...state.projects],
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
    case SINGLE_TASK:
      return {
        ...state,
        single_task: action.payload,
      };
    case ADD_TASK:
      return {
        ...state,
        tasks: [action.payload, ...state.tasks],
      };
    case DELETE_TASK:
      return {
        ...state,
        delete_task: action.payload,
      };
    case UPDATE_TASK:
      return {
        ...state,
        update_task: [action.payload, ...state.update_task],
      };

    default:
      return state;
  }
};

export default reducer;
