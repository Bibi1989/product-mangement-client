import axios from "axios";
import { registerAction, loginAction, errorAction } from "./actions";
import { LOADING } from "./types";

const LOGIN_URL = `https://b-manager-api.herokuapp.com/auth/v1/login`;
const REGISTER_URL = `https://b-manager-api.herokuapp.com/auth/v1/register`;

export const registerUser = async (dispatch, user, history) => {
  try {
    dispatch({ type: LOADING, payload: true });
    const response = await axios.post(`${REGISTER_URL}`, user, {
      headers: {
        "Content-Type": "Application/Json",
      },
    });
    // history.push("/dashboard");
    window.location.href = "https://b-manager.netlify.app/dashboard";
    dispatch({ type: LOADING, payload: false });
    dispatch(registerAction(response.data));
  } catch (error) {
    dispatch({ type: LOADING, payload: false });
    return dispatch(errorAction(error.response));
  }
};

export const loginUser = async (dispatch, user, history) => {
  try {
    dispatch({ type: LOADING, payload: true });
    const response = await axios.post(`${LOGIN_URL}`, user, {
      headers: {
        "Content-Type": "Application/Json",
      },
    });
    sessionStorage.setItem(
      "project_user",
      JSON.stringify(response.data.data.user)
    );
    sessionStorage.setItem("token", JSON.stringify(response.data.data.token));
    history.push("/dashboard");
    dispatch({ type: LOADING, payload: false });
    window.location.href = "https://b-manager.netlify.app/dashboard";
    dispatch(loginAction(response.data));
  } catch (error) {
    dispatch({ type: LOADING, payload: false });
    return dispatch(errorAction(error.response));
  }
};
