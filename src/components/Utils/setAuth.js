import axios from "axios";

export const setAuth = (token) => {
  if (token) {
    return axios.defaults.headers.common["token"];
  } else {
    delete axios.defaults.headers.common["token"];
  }
};
