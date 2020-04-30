import axios from "axios";
import {
  getAllAction,
  getASingleAction,
  addAction,
  updateAction,
  deleteAction,
  getTaskAction,
  addTaskAction,
} from "./action";
const PROJECT_URL = "http://localhost:5000/api/v1/projects";
const TASK_URL = "http://localhost:5000/api/v1/tasks";
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
export const createTask = async (dispatch, id, task, history) => {
  const tasks = {
    ...task,
    ProjectId: id,
  };
  const response = await axios.post(`${TASK_URL}/add`, tasks, {
    headers: {
      "Content-type": "Application/Json",
      auth: `${token}`,
    },
  });
  history.push(`/tasks/${id}`);
  console.log({ res: response.data.data, tok: token });
  dispatch(addTaskAction(response.data.data));
};
export const getTasks = async (dispatch, ProjectId) => {
  console.log({ proId: ProjectId });
  const data = {
    ProjectId,
  };
  const response = await axios.post(`${TASK_URL}`, JSON.stringify(data), {
    headers: {
      "Content-type": "Application/Json",
      auth: `${token}`,
    },
  });
  dispatch(getTaskAction(response.data.data));
};
