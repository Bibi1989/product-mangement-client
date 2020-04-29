import axios from "axios";
import { registerAction, loginAction, errorAction } from "./actions";

const LOGIN_URL = `http://localhost:5000/auth/v1/login`;
const REGISTER_URL = `http://localhost:5000/auth/v1/register`;

export const registerUser = async (dispatch, user, history) => {
  try {
    const response = await axios.post(`${REGISTER_URL}`, user, {
      headers: {
        "Content-Type": "Application/Json",
      },
    });
    history.push("/dashboard");
    return dispatch(registerAction(response.data));
  } catch (error) {
    return dispatch(errorAction(error.response));
  }
};

export const loginUser = async (dispatch, user, history) => {
  try {
    const response = await axios.post(`${LOGIN_URL}`, user, {
      headers: {
        "Content-Type": "Application/Json",
      },
    });
    console.log(response.data.data);
    sessionStorage.setItem(
      "project_user",
      JSON.stringify(response.data.data.user)
    );
    sessionStorage.setItem("token", JSON.stringify(response.data.data.token));
    history.push("/dashboard");
    dispatch(loginAction(response.data));
  } catch (error) {
    return dispatch(errorAction(error.response));
  }
};
