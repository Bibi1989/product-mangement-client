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
  INVITE,
  NOTIFY,
  DELETE_NOTIFICATION,
  GET_INVITE,
  ACCEPT_INVITE,
  LOADING,
  ERROR,
} from "./type";

const initialState = {
  projects: [],
  project: null,
  deleted_project: null,
  updated_project: null,
  added_project: null,
  tasks: null,
  task: null,
  delete_task: null,
  update_task: [],
  single_task: null,
  count: 0,
  length: [],
  invite: [],
  notify: null,
  delete_notify: null,
  invites: null,
  accept: null,
  loading: false,
  errors: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHALL:
      const count =
        action.payload !== undefined &&
        action.payload.reduce((a, v) => (a += v.Tasks.length), 0);
      // console.log(state.projects);
      return {
        ...state,
        projects: action.payload,
        count: count,
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
        task: action.payload,
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
    case INVITE:
      return {
        ...state,
        invite: action.payload,
      };
    case GET_INVITE:
      return {
        ...state,
        invites: action.payload,
      };
    case NOTIFY:
      return {
        ...state,
        notify: action.payload,
      };
    case DELETE_NOTIFICATION:
      return {
        ...state,
        delete_notify: action.payload,
      };
    case ACCEPT_INVITE:
      return {
        ...state,
        accept: action.payload,
      };
    case LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case ERROR:
      return {
        ...state,
        errors: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
