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
const PROJECT_URL = "https://b-manager-api.herokuapp.com/api/v1/projects";
// const PROJECT_URL = "http://localhost:5000/api/v1/projects";
const TASK_URL = "https://b-manager-api.herokuapp.com/api/v1/tasks";
const NOTIFY_URL = "https://b-manager-api.herokuapp.com/api/v1/notify";
const INVITE_URL = "https://b-manager-api.herokuapp.com/api/v1/invite";

const token = JSON.parse(sessionStorage.getItem("token"));
const user = JSON.parse(sessionStorage.getItem("project_user"));

export const fetchAllProjects = async (dispatch) => {
  try {
    const response = await axios.get(PROJECT_URL, {
      headers: {
        "Content-type": "Application/Json",
        auth: `${token}`,
      },
    });
    console.log(response.data.data);
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
export const inviteUser = async (dispatch, ProjectId, email) => {
  try {
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
    dispatch(notifyAction(notification.data.data));
    dispatch(inviteAction(response.data.data));
  } catch (error) {
    console.log(error.response);
  }
};
export const getInvites = async (dispatch) => {
  try {
    const notification = await axios.get(`${INVITE_URL}`, {
      headers: {
        "Content-type": "Application/Json",
        auth: `${token}`,
      },
    });
    dispatch(getInviteAction(notification.data.data.data));
  } catch (error) {
    console.log(error.response);
  }
};
export const acceptInvite = async (dispatch, ProjectId) => {
  try {
    await axios.get(`${INVITE_URL}/accept/${ProjectId}`, {
      headers: {
        "Content-type": "Application/Json",
        auth: `${token}`,
      },
    });
    dispatch(acceptAction("You a colloborator"));
  } catch (error) {
    console.log(error.response);
  }
};
export const deleteInvite = async (dispatch, inviteId) => {
  console.log({ intId: inviteId });
  try {
    await axios.delete(`${INVITE_URL}/${inviteId}`, {
      headers: {
        "Content-type": "Application/Json",
        auth: `${token}`,
      },
    });
    dispatch(acceptAction("You a colloborator"));
  } catch (error) {
    console.log(error.response);
  }
};
export const getNotifications = async (dispatch) => {
  try {
    const notification = await axios.get(`${NOTIFY_URL}`, {
      headers: {
        "Content-type": "Application/Json",
        auth: `${token}`,
      },
    });
    dispatch(notifyAction(notification.data.data));
  } catch (error) {
    console.log(error.response);
  }
};
export const notifyMe = async (dispatch, msg, ProjectId, TaskId) => {
  try {
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
    dispatch(notifyAction(notification.data.data));
  } catch (error) {
    console.log(error.response);
  }
};
export const deleteNotification = async (dispatch, deleteId) => {
  try {
    const notification = await axios.delete(`${NOTIFY_URL}/${deleteId}`, {
      headers: {
        "Content-type": "Application/Json",
        auth: `${token}`,
      },
    });
    dispatch(notifyDeleteAction(notification.data.data));
  } catch (error) {
    console.log(error.response);
  }
};
export const deleteAllNotification = async (dispatch) => {
  try {
    const notification = await axios.delete(`${NOTIFY_URL}`, {
      headers: {
        "Content-type": "Application/Json",
        auth: `${token}`,
      },
    });
    dispatch(notifyDeleteAction(notification.data.data));
  } catch (error) {
    console.log(error.response);
  }
};
