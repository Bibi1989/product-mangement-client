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
  NOTIFY,
  DELETE_NOTIFICATION,
  INVITE,
  GET_INVITE,
  ACCEPT_INVITE,
  ERROR,
} from "./type";

export const getAllAction = (response) => {
  return { type: FETCHALL, payload: response };
};

export const addAction = (response) => ({
  type: ADD,
  payload: response,
});

export const getASingleAction = (response) => ({
  type: FETCHSINGLE,
  payload: response,
});

export const updateAction = (response) => ({
  type: UPDATE,
  payload: response,
});

export const deleteAction = (response) => ({
  type: DELETE,
  payload: response,
});
export const getTaskAction = (response) => ({
  type: TASK,
  payload: response,
});
export const singleAction = (response) => ({
  type: SINGLE_TASK,
  payload: response,
});
export const addTaskAction = (response) => ({
  type: ADD_TASK,
  payload: response,
});
export const updateTaskAction = (response) => ({
  type: UPDATE_TASK,
  payload: response,
});
export const deleteTaskAction = (response) => ({
  type: DELETE_TASK,
  payload: response,
});
export const inviteAction = (response) => ({
  type: INVITE,
  payload: response,
});
export const getInviteAction = (response) => ({
  type: GET_INVITE,
  payload: response,
});
export const notifyAction = (response) => ({
  type: NOTIFY,
  payload: response,
});
export const notifyDeleteAction = (response) => ({
  type: DELETE_NOTIFICATION,
  payload: response,
});
export const acceptAction = (response) => ({
  type: ACCEPT_INVITE,
  payload: response,
});
export const errorsAction = (response) => ({
  type: ERROR,
  payload: response,
});
