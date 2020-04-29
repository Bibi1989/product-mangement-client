import axios from "axios";
import {
  getAllAction,
  getASingleAction,
  addAction,
  updateAction,
  deleteAction,
} from "./action";
const PROJECT_URL = "http://localhost:5000/api/v1/projects";
const token = JSON.parse(sessionStorage.getItem("token"));

export const fetchAllProjects = async (dispatch) => {
  const response = await axios.get(PROJECT_URL, {
    headers: {
      "Content-type": "Application/Json",
      auth: `${token}`,
    },
  });
  console.log({ res: response.data.data, tok: token });
  dispatch(getAllAction(response.data.data));
};

export const addProject = async (dispatch, project, history) => {
  const response = await axios.post(PROJECT_URL, project, {
    headers: {
      "Content-type": "Application/Json",
      auth: `${token}`,
    },
  });
  history.push("/dashboard");
  console.log({ res: response.data.data, tok: token });
  dispatch(getAllAction(response.data.data));
};
export const deleteProject = async (dispatch, id, history) => {
  const response = await axios.delete(`${PROJECT_URL}/${id}`, {
    headers: {
      "Content-type": "Application/Json",
      auth: `${token}`,
    },
  });
  history.push("/dashboard");
  console.log({ res: response.data.data, tok: token });
  dispatch(deleteAction(response.data.data));
};
export const getSingleProject = async (dispatch, id, history) => {
  const response = await axios.get(`${PROJECT_URL}/${id}`, {
    headers: {
      "Content-type": "Application/Json",
      auth: `${token}`,
    },
  });
  //   history.push("/dashboard");
  console.log({ res: response.data.data, tok: token });
  dispatch(getASingleAction(response.data.data));
};
export const updateProject = async (dispatch, id, value, history) => {
  const response = await axios.put(`${PROJECT_URL}/${id}`, value, {
    headers: {
      "Content-type": "Application/Json",
      auth: `${token}`,
    },
  });
  history.push("/dashboard");
  console.log({ res: response.data.data, tok: token });
  dispatch(updateAction(response.data.data));
};
