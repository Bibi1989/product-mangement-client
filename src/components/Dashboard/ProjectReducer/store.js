import axios from "axios";
import {
  getAllAction,
  getASingleAction,
  addAction,
  updateAction,
  deleteAction,
  getTaskAction,
  addTaskAction,
  deleteTaskAction,
  updateTaskAction,
  singleAction,
} from "./action";
const PROJECT_URL = "https://b-manager-api.herokuapp.com/api/v1/projects";
// const PROJECT_URL = "http://localhost:5000/api/v1/projects";
const TASK_URL = "https://b-manager-api.herokuapp.com/api/v1/tasks";
// const TASK_URL = "http://localhost:5000/api/v1/tasks";
const token = JSON.parse(sessionStorage.getItem("token"));

export const fetchAllProjects = async (dispatch) => {
  try {
    const response = await axios.get(PROJECT_URL, {
      headers: {
        "Content-type": "Application/Json",
        auth: `${token}`,
      },
    });
    dispatch(getAllAction(response.data.data));
  } catch (error) {
    console.log(error.response);
  }
};

export const addProject = async (dispatch, project, history) => {
  try {
    const response = await axios.post(`${PROJECT_URL}`, project, {
      headers: {
        "Content-type": "Application/Json",
        auth: `${token}`,
      },
    });
    history.push("/dashboard");
    dispatch(addAction(response.data.data));
  } catch (error) {
    console.log(error.response);
  }
};
export const deleteProject = async (dispatch, id, history) => {
  try {
    const response = await axios.delete(`${PROJECT_URL}/${id}`, {
      headers: {
        "Content-type": "Application/Json",
        auth: `${token}`,
      },
    });
    history.push("/dashboard");
    dispatch(deleteAction(response.data.data));
  } catch (error) {
    console.log(error.response);
  }
};
export const getSingleProject = async (dispatch, id) => {
  try {
    const response = await axios.get(`${PROJECT_URL}/${id}`, {
      headers: {
        "Content-type": "Application/Json",
        auth: `${token}`,
      },
    });
    dispatch(getASingleAction(response.data.data));
  } catch (error) {
    console.log(error.response);
  }
};
export const updateProject = async (dispatch, id, value, history) => {
  try {
    const response = await axios.put(`${PROJECT_URL}/${id}`, value, {
      headers: {
        "Content-type": "Application/Json",
        auth: `${token}`,
      },
    });
    history.push("/dashboard");
    dispatch(updateAction(response.data.data));
  } catch (error) {
    console.log(error.response);
  }
};
export const createTask = async (dispatch, id, task, history) => {
  const tasks = {
    ...task,
    status: "start",
    ProjectId: id,
  };
  try {
    const response = await axios.post(`${TASK_URL}/add`, tasks, {
      headers: {
        "Content-type": "Application/Json",
        auth: `${token}`,
      },
    });
    history.push(`/tasks/${id}`);
    dispatch(addTaskAction(response.data.data));
  } catch (error) {
    console.log(error.response);
  }
};
export const getTasks = async (dispatch, ProjectId) => {
  const data = {
    ProjectId,
  };
  try {
    const response = await axios.post(`${TASK_URL}`, JSON.stringify(data), {
      headers: {
        "Content-type": "Application/Json",
        auth: `${token}`,
      },
    });
    dispatch(getTaskAction(response.data.data));
  } catch (error) {
    console.log(error.response);
  }
};
export const getOne = async (dispatch, id) => {
  try {
    const response = await axios.get(`${TASK_URL}/${id}`, {
      headers: {
        "Content-type": "Application/Json",
        auth: `${token}`,
      },
    });
    console.log({ response });
    dispatch(singleAction(response.data.data));
  } catch (error) {
    console.log(error.response);
  }
};
export const updateTask = async (dispatch, id, value, status) => {
  const tasks = {
    ...value,
    status,
  };
  try {
    const response = await axios.patch(`${TASK_URL}/status/${id}`, tasks, {
      headers: {
        "Content-type": "Application/Json",
        auth: `${token}`,
      },
    });
    dispatch(updateTaskAction(response.data.data));
  } catch (error) {
    console.log(error.response);
  }
};
export const deleteTask = async (dispatch, id) => {
  try {
    const response = await axios.delete(`${TASK_URL}/${id}`, {
      headers: {
        "Content-type": "Application/Json",
        auth: `${token}`,
      },
    });
    dispatch(deleteTaskAction(response.data.data));
  } catch (error) {
    console.log(error.response);
  }
};
