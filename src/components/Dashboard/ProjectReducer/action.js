import { ADD, FETCHALL, FETCHSINGLE, DELETE, UPDATE, TASK } from "./type";

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
