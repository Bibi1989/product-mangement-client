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
  inviteAction,
  notifyAction,
  notifyDeleteAction,
  getInviteAction,
  acceptAction,
} from "./action";
import { LOADING, CURRENT, CLEAR } from "./type";
const PROJECT_URL = "https://b-manager-api.herokuapp.com/api/v1/projects";
const TASK_URL = "https://b-manager-api.herokuapp.com/api/v1/tasks";
const NOTIFY_URL = "https://b-manager-api.herokuapp.com/api/v1/notify";
const INVITE_URL = "https://b-manager-api.herokuapp.com/api/v1/invite";

const token = JSON.parse(sessionStorage.getItem("token"));
const user = JSON.parse(sessionStorage.getItem("project_user"));

export const fetchAllProjects = async (dispatch) => {
  try {
    dispatch({ type: LOADING, payload: true });
    const response = await axios.get(PROJECT_URL, {
      headers: {
        "Content-type": "Application/Json",
        auth: `${token}`,
      },
    });
    dispatch({ type: LOADING, payload: false });
    dispatch(getAllAction(response.data.data));
  } catch (error) {
    dispatch({ type: LOADING, payload: false });
    console.log(error.response);
  }
};

export const addProject = async (dispatch, project, history, handleClose) => {
  try {
    dispatch({ type: LOADING, payload: true });
    const response = await axios.post(`${PROJECT_URL}`, project, {
      headers: {
        "Content-type": "Application/Json",
        auth: `${token}`,
      },
    });
    history.push("/dashboard");
    handleClose();
    dispatch({ type: LOADING, payload: false });
    dispatch(addAction(response.data.data));
  } catch (error) {
    dispatch({ type: LOADING, payload: false });
    console.log(error.response);
  }
};
export const deleteProject = async (dispatch, id, history) => {
  try {
    dispatch({ type: LOADING, payload: true });
    const response = await axios.delete(`${PROJECT_URL}/${id}`, {
      headers: {
        "Content-type": "Application/Json",
        auth: `${token}`,
      },
    });
    history.push("/dashboard");
    dispatch({ type: LOADING, payload: false });
    dispatch(deleteAction(response.data.data));
  } catch (error) {
    dispatch({ type: LOADING, payload: false });
    console.log(error.response);
  }
};
export const getSingleProject = async (dispatch, id) => {
  try {
    dispatch({ type: LOADING, payload: true });
    const response = await axios.get(`${PROJECT_URL}/${id}`, {
      headers: {
        "Content-type": "Application/Json",
        auth: `${token}`,
      },
    });
    dispatch({ type: LOADING, payload: false });
    dispatch(getASingleAction(response.data.data));
  } catch (error) {
    dispatch({ type: LOADING, payload: false });
    console.log(error.response);
  }
};
export const updateProject = async (
  dispatch,
  id,
  value,
  history,
  handleClose
) => {
  try {
    dispatch({ type: LOADING, payload: true });
    const response = await axios.put(`${PROJECT_URL}/${id}`, value, {
      headers: {
        "Content-type": "Application/Json",
        auth: `${token}`,
      },
    });

    if (response.data.data.status !== "error") {
      history.push("/dashboard");
      handleClose();
      dispatch({ type: LOADING, payload: false });
      dispatch(updateAction(response.data.data));
    }
    dispatch({ type: LOADING, payload: false });
  } catch (error) {
    dispatch({ type: LOADING, payload: false });
    console.log(error.response);
  }
};

export const getCurrent = (dispatch, project) => {
  dispatch({ type: CURRENT, payload: project });
};

export const clearCurrent = (dispatch) => {
  dispatch({ type: CLEAR });
};

export const createTask = async (dispatch, id, task, history, handleClose) => {
  const tasks = {
    ...task,
    status: "start",
    ProjectId: id,
  };

  try {
    dispatch({ type: LOADING, payload: true });
    const response = await axios.post(`${TASK_URL}/add`, tasks, {
      headers: {
        "Content-type": "Application/Json",
        auth: `${token}`,
      },
    });
    handleClose();
    history.push(`/tasks/${id}`);
    dispatch({ type: LOADING, payload: false });
    dispatch(addTaskAction(response.data.data));
  } catch (error) {
    dispatch({ type: LOADING, payload: false });
    console.log(error.response);
  }
};
export const getTasks = async (dispatch, ProjectId) => {
  const data = {
    ProjectId,
  };
  try {
    dispatch({ type: LOADING, payload: true });
    const response = await axios.post(`${TASK_URL}`, JSON.stringify(data), {
      headers: {
        "Content-type": "Application/Json",
        auth: `${token}`,
      },
    });
    dispatch({ type: LOADING, payload: false });
    dispatch(getTaskAction(response.data.data));
  } catch (error) {
    dispatch({ type: LOADING, payload: false });
    console.log(error.response);
  }
};
export const getOne = async (dispatch, id) => {
  try {
    dispatch({ type: LOADING, payload: true });
    const response = await axios.get(`${TASK_URL}/${id}`, {
      headers: {
        "Content-type": "Application/Json",
        auth: `${token}`,
      },
    });
    dispatch({ type: LOADING, payload: false });
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
    dispatch({ type: LOADING, payload: true });
    const response = await axios.patch(`${TASK_URL}/status/${id}`, tasks, {
      headers: {
        "Content-type": "Application/Json",
        auth: `${token}`,
      },
    });
    dispatch({ type: LOADING, payload: false });
    dispatch(updateTaskAction(response.data.data));
  } catch (error) {
    dispatch({ type: LOADING, payload: false });
    console.log(error.response);
  }
};
export const deleteTask = async (dispatch, id) => {
  try {
    dispatch({ type: LOADING, payload: true });
    const response = await axios.delete(`${TASK_URL}/${id}`, {
      headers: {
        "Content-type": "Application/Json",
        auth: `${token}`,
      },
    });
    dispatch({ type: LOADING, payload: false });
    dispatch(deleteTaskAction(response.data.data));
  } catch (error) {
    dispatch({ type: LOADING, payload: false });
    console.log(error.response);
  }
};
export const inviteUser = async (dispatch, ProjectId, email) => {
  try {
    dispatch({ type: LOADING, payload: true });
    const response = await axios.post(
      `${INVITE_URL}`,
      { ProjectId, email },
      {
        headers: {
          "Content-type": "Application/Json",
          auth: `${token}`,
        },
      }
    );
    dispatch({ type: LOADING, payload: false });
    const data = {
      notify: `Email sent successfully to ${email}`,
      ProjectId,
      TaskId: null,
    };
    const notification = await axios.post(`${NOTIFY_URL}`, data, {
      headers: {
        "Content-type": "Application/Json",
        auth: `${token}`,
      },
    });
    dispatch({ type: LOADING, payload: false });
    dispatch(notifyAction(notification.data.data));
    dispatch(inviteAction(response.data.data));
  } catch (error) {
    dispatch({ type: LOADING, payload: false });
    console.log(error.response);
  }
};
export const getInvites = async (dispatch) => {
  try {
    dispatch({ type: LOADING, payload: true });
    const notification = await axios.get(`${INVITE_URL}`, {
      headers: {
        "Content-type": "Application/Json",
        auth: `${token}`,
      },
    });
    dispatch(getInviteAction(notification.data.data.data));
  } catch (error) {
    dispatch({ type: LOADING, payload: false });
    console.log(error.response);
  }
};
export const acceptInvite = async (dispatch, ProjectId) => {
  try {
    dispatch({ type: LOADING, payload: true });
    await axios.get(`${INVITE_URL}/accept/${ProjectId}`, {
      headers: {
        "Content-type": "Application/Json",
        auth: `${token}`,
      },
    });
    dispatch({ type: LOADING, payload: false });
    dispatch(acceptAction("You a colloborator"));
  } catch (error) {
    dispatch({ type: LOADING, payload: false });
    console.log(error.response);
  }
};
export const deleteInvite = async (dispatch, inviteId) => {
  try {
    dispatch({ type: LOADING, payload: true });
    await axios.delete(`${INVITE_URL}/${inviteId}`, {
      headers: {
        "Content-type": "Application/Json",
        auth: `${token}`,
      },
    });
    dispatch({ type: LOADING, payload: false });
    dispatch(acceptAction("You a colloborator"));
  } catch (error) {
    dispatch({ type: LOADING, payload: false });
    console.log(error.response);
  }
};
export const getNotifications = async (dispatch) => {
  try {
    dispatch({ type: LOADING, payload: true });
    const notification = await axios.get(`${NOTIFY_URL}`, {
      headers: {
        "Content-type": "Application/Json",
        auth: `${token}`,
      },
    });
    dispatch({ type: LOADING, payload: false });
    dispatch(notifyAction(notification.data.data));
  } catch (error) {
    dispatch({ type: LOADING, payload: false });
    console.log(error.response);
  }
};
export const notifyMe = async (dispatch, msg, ProjectId, TaskId) => {
  try {
    dispatch({ type: LOADING, payload: true });
    const data = {
      notify: msg,
      ProjectId,
      TaskId,
    };
    const notification = await axios.post(`${NOTIFY_URL}`, data, {
      headers: {
        "Content-type": "Application/Json",
        auth: `${token}`,
      },
    });
    dispatch({ type: LOADING, payload: false });
    dispatch(notifyAction(notification.data.data));
  } catch (error) {
    dispatch({ type: LOADING, payload: false });
    console.log(error.response);
  }
};
export const deleteNotification = async (dispatch, deleteId) => {
  try {
    dispatch({ type: LOADING, payload: true });
    const notification = await axios.delete(`${NOTIFY_URL}/${deleteId}`, {
      headers: {
        "Content-type": "Application/Json",
        auth: `${token}`,
      },
    });
    dispatch({ type: LOADING, payload: false });
    dispatch(notifyDeleteAction(notification.data.data));
  } catch (error) {
    dispatch({ type: LOADING, payload: false });
    console.log(error.response);
  }
};
export const deleteAllNotification = async (dispatch) => {
  try {
    dispatch({ type: LOADING, payload: true });
    const notification = await axios.delete(`${NOTIFY_URL}`, {
      headers: {
        "Content-type": "Application/Json",
        auth: `${token}`,
      },
    });
    dispatch({ type: LOADING, payload: false });
    dispatch(notifyDeleteAction(notification.data.data));
  } catch (error) {
    dispatch({ type: LOADING, payload: false });
    console.log(error.response);
  }
};
