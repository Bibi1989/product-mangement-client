import axios from "axios";
import { registerAction, loginAction, errorAction } from "./actions";

const LOGIN_URL = `https://b-manager-api.herokuapp.com/auth/v1/login`;
// const LOGIN_URL = `http://localhost:5000/auth/v1/login`;
const REGISTER_URL = `https://b-manager-api.herokuapp.com/auth/v1/register`;
// const REGISTER_URL = `http://localhost:5000/auth/v1/register`;

export let loading = false;

export const registerUser = async (dispatch, user, history) => {
  try {
    const response = await axios.post(`${REGISTER_URL}`, user, {
      headers: {
        "Content-Type": "Application/Json",
      },
    });
    // history.push("/dashboard");
    window.location.href = "https://b-manager.netlify.app/dashboard";
    return dispatch(registerAction(response.data));
  } catch (error) {
    return dispatch(errorAction(error.response));
  }
};

export const loginUser = async (dispatch, user, history) => {
  try {
    dispatch({ type: "Loading", payload: true });
    loading = true;
    const response = await axios.post(`${LOGIN_URL}`, user, {
      headers: {
        "Content-Type": "Application/Json",
      },
    });
    dispatch({ type: "Loading", payload: false });
    loading = false;
    sessionStorage.setItem(
      "project_user",
      JSON.stringify(response.data.data.user)
    );
    sessionStorage.setItem("token", JSON.stringify(response.data.data.token));
    // history.push("/dashboard");
    // window.location.href = "https://b-manager.netlify.app/dashboard";
    // window.location.href = "http://localhost:3000/dashboard";
    dispatch(loginAction(response.data));
    // } else {
    //   history.push("/");
    // }
  } catch (error) {
    return dispatch(errorAction(error.response));
  }
};
