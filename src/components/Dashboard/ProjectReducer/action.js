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

export const getAllAction = (response) => ({
  type: FETCHALL,
  payload: response,
});

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
