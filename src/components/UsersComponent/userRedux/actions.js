import { LOGIN, REGISTER, ERRORS } from "./types";

export const registerAction = (response) => ({
  type: REGISTER,
  payload: response,
});

export const loginAction = (response) => ({
  type: LOGIN,
  payload: response,
});

export const errorAction = (response) => ({
  type: ERRORS,
  payload: response,
});
