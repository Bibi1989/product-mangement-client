import axios from "axios";
import {
  getAllAction,
  getASingleAction,
  addAction,
  updateAction,
  deleteAction,
  getTaskAction,
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
  dispatch(getAllAction(response.data.data));
};

export const addProject = async (dispatch, project, history) => {
  try {
    const response = await axios.post(
      `http://localhost:5000/api/v1/projects`,
      project,
      {
        headers: {
          "Content-type": "Application/Json",
          auth: `${token}`,
        },
      }
    );
    // history.push("/dashboard");
    dispatch(addAction(response.data.data));
  } catch (error) {
    console.log(error.response);
  }
};
export const deleteProject = async (dispatch, id, history) => {
  const response = await axios.delete(`${PROJECT_URL}/${id}`, {
    headers: {
      "Content-type": "Application/Json",
      auth: `${token}`,
    },
  });
  history.push("/dashboard");
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
  dispatch(updateAction(response.data.data));
};
export const getSingleTask = async (dispatch, id, history) => {
  const response = await axios.get(`${PROJECT_URL}/${id}`, {
    headers: {
      "Content-type": "Application/Json",
      auth: `${token}`,
    },
  });
  history.push("/tasks");
  console.log({ res: response.data.data.Tasks, tok: token });
  dispatch(getTaskAction(response.data.data.Tasks));
};
