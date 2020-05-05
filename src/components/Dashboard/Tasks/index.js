import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import {
  getTasks,
  deleteTask,
  updateTask,
  getSingleProject,
  inviteUser,
  getNotifications,
  notifyMe,
} from "../ProjectReducer/store";
import CreateTask from "../CreateTask";
import { Button, Spinner, Dropdown } from "react-bootstrap";
import { Icon, Form } from "semantic-ui-react";
import { Cover, TaskHeader } from "../Home/style";

const Tasks = () => {
  const user = JSON.parse(sessionStorage.getItem("project_user"));
  const { projectId } = useParams();
  const history = useHistory();
  let tasks = useSelector(({ project: { tasks } }) => tasks);
  const single_project = useSelector(({ project: { project } }) => project);
  const delete_task = useSelector(
    ({ project: { delete_task } }) => delete_task
  );
  const update_task = useSelector(
    ({ project: { update_task } }) => update_task
  );

  const single_task = useSelector(({ project: { task } }) => task);

  let reviews =
    (tasks !== null && tasks.filter((task) => task.status === "review")) ||
    null;
  let finishes =
    (tasks !== null && tasks.filter((task) => task.status === "finish")) ||
    null;
  let starts =
    (tasks !== null && tasks.filter((task) => task.status === "start")) || null;
  const dispatch = useDispatch();

  useEffect(() => {
    getTasks(dispatch, parseInt(projectId));
    getSingleProject(dispatch, projectId);
    getNotifications(dispatch);
  }, [delete_task, update_task, single_task]);

  const notify = useSelector(({ project: { notify } }) => notify);

  console.log({ notify, delete_task });

  const [show, setShow] = useState("");

  const [open, setOpen] = useState(false);

  const handleDelete = (id) => {
    deleteTask(dispatch, parseInt(id));
    notifyMe(dispatch, "You deleted a task", projectId, id);
    setShow("");
  };
  const handleEdit = (id) => {
    notifyMe(dispatch, "You edited a task", projectId, id);
    setShow("");
    history.push(`/tasks/${projectId}`);
  };
  const [email, setEmail] = useState("");

  const handleInvite = ({ target: { value } }) => {
    notifyMe(dispatch, "You invited a member", projectId, null);
    setEmail(value);
  };

  const [shows, setShows] = useState(false);

  const handleShow = () => setShows(true);
  const handleClose = () => setShows(false);

  return (
    <Container>
      <Headers>
        <Icon
          name='home'
          size='big'
          style={{
            color: "orangered",
            marginBottom: "0.7em",
            cursor: "pointer",
          }}
          onClick={() => history.push("/dashboard")}
        />
        <Form>
          <Form.Field
            style={{ marginRight: "1em", display: "flex", alignSelf: "center" }}
          >
            <input
              placeholder={`Invite member to ${
                single_project !== null && single_project.project_name
              }`}
              onChange={handleInvite}
              style={{ padding: "1em", width: "100%", marginRight: "0.5em" }}
            />
            <Button onClick={() => inviteUser(dispatch, projectId, email)}>
              Invite
            </Button>
          </Form.Field>
        </Form>
      </Headers>
      <P>
        <span>{single_project !== null && single_project.project_name}</span>
        <span className='admin'>
          {single_project !== null && single_project.User.first_name}{" "}
          {single_project !== null && single_project.User.last_name} - Admin
        </span>
      </P>
      <Row>
        <Col>
          <h1>Start</h1>
          <Button
            variant='primary'
            onClick={handleShow}
            style={{ marginBottom: "1em" }}
          >
            <Icon name='plus' /> Create Task
          </Button>
          <CreateTask show={shows} handleClose={handleClose} />
          <Task>
            <div className='spinner'>
              {starts === null && (
                <Spinner animation='border' variant='success' />
              )}
            </div>
            {starts !== null &&
              starts.map((task) => (
                <Display key={task.id}>
                  <TaskHeader color={task.project_sequence}>
                    <p>{task.project_sequence}</p>
                    <p className='added_person'>
                      Added by {task.User.first_name}
                    </p>
                  </TaskHeader>
                  <p>{task.summary}</p>
                  <div className='status'>
                    <p>{task.createdAt}</p>
                    <Cover>
                      <Dropdown>
                        <Dropdown.Toggle
                          variant='info'
                          id='dropdown-basic'
                        ></Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item href='#/action-1'>
                            <p onClick={() => handleEdit(task.id)}>
                              <Icon name='edit' color='teal' /> Edit
                            </p>
                          </Dropdown.Item>
                          <Dropdown.Item href='#/action-2'>
                            <p onClick={() => handleDelete(task.id)}>
                              <Icon name='cut' color='orange' /> Delete
                            </p>
                          </Dropdown.Item>
                          <Dropdown.Item href='#/action-3'>
                            <p
                              onClick={() => {
                                updateTask(dispatch, task.id, task, "review");
                              }}
                            >
                              <Icon name='arrow right' color='orange'></Icon>{" "}
                              Move
                            </p>
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </Cover>
                  </div>
                </Display>
              ))}
          </Task>
        </Col>
        <Col>
          <h1>Review</h1>
          <Task>
            <div className='spinner'>
              {starts === null && (
                <Spinner animation='border' variant='success' />
              )}
            </div>
            {reviews !== null &&
              reviews.map((task) => (
                <Display key={task.id}>
                  <TaskHeader color={task.project_sequence}>
                    <p>{task.project_sequence}</p>
                    <p className='added_person'>
                      Added by {task.User.first_name}
                    </p>
                  </TaskHeader>
                  <p>{task.summary}</p>
                  <div className='status'>
                    <p>{task.createdAt}</p>
                    <Cover>
                      <Dropdown>
                        <Dropdown.Toggle
                          variant='info'
                          id='dropdown-basic'
                        ></Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item href='#/action-1'>
                            <p
                              onClick={() => {
                                updateTask(dispatch, task.id, task, "start");
                              }}
                            >
                              <Icon name='arrow left' color='orange'></Icon>{" "}
                              Move back To Start
                            </p>
                          </Dropdown.Item>
                          <Dropdown.Item href='#/action-2'>
                            <p
                              onClick={() => {
                                updateTask(dispatch, task.id, task, "finish");
                              }}
                            >
                              <Icon name='arrow right' color='orange'></Icon>{" "}
                              Move To Finish
                            </p>
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </Cover>
                  </div>
                </Display>
              ))}
          </Task>
        </Col>
        <Col>
          <h1>Finish</h1>
          <Task>
            <div className='spinner'>
              {starts === null && (
                <Spinner animation='border' variant='success' />
              )}
            </div>
            {finishes !== null &&
              finishes.map((task) => (
                <Display key={task.id}>
                  <TaskHeader color={task.project_sequence}>
                    <p>{task.project_sequence}</p>
                    <p className='added_person'>
                      Added by {task.User.first_name}
                    </p>
                  </TaskHeader>
                  <p>{task.summary}</p>
                  <div className='status'>
                    <p>{task.createdAt}</p>
                    <Cover>
                      <Dropdown>
                        <Dropdown.Toggle
                          variant='info'
                          id='dropdown-basic'
                        ></Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item href='#/action-1'>
                            <p
                              onClick={() => {
                                updateTask(dispatch, task.id, task, "review");
                              }}
                            >
                              <Icon name='arrow left' color='orange'></Icon>{" "}
                              Move back To Review
                            </p>
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </Cover>
                  </div>
                </Display>
              ))}
          </Task>
        </Col>
      </Row>
    </Container>
  );
};

export default Tasks;

export const Container = styled.div`
  padding: 1% 10%;
  background: #f9fbfc;

  @media (max-width: 1200px) {
    padding: 3% 5%;
  }
  @media (max-width: 769px) {
    padding: 3% 1em;
  }
`;
export const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2em;

  @media (max-width: 769px) {
    grid-template-columns: 1fr;
  }
`;
export const Col = styled.div`
  padding: 1em;
  background: #ffffff;
  border-radius: 0.25em;
  box-shadow: 0 0 30px #cccccc;

  h1 {
    padding-bottom: 1em;
    color: teal;
  }

  input {
    border: 1px solid orangered;
    padding: 0.8em;
    border-radius: 0.3em;
    outline: none;
    margin-bottom: 0.8em;
  }

  p {
    padding: 0;
    padding-bottom: 0.5em;
    margin: 0;
  }
`;
export const Display = styled.div`
  padding: 0.8em;
  background: #f9fbfc;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 0.8em;
  color: #777777;
  border-radius: 0.3em;
  box-shadow: 0px 0px 5px #eee;

  .status {
    display: flex;
    justify-content: space-between;
  }
`;

export const Task = styled.div`
  min-height: 40vh;
  max-height: 50vh;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  &::-webkit-scrollbar {
    /* display: none; */
    width: 2px;
  }
  &::-webkit-scrollbar-thumb {
    /* display: none; */
    width: 1.5px;
    background-color: orangered;
  }

  .spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const P = styled.p`
  font-size: 1.5em;
  font-weight: 800;
  color: orangered;
  display: flex;
  flex-direction: column;

  .admin {
    color: teal;
    font-size: 0.8em;
  }
`;
export const Headers = styled.div`
  display: flex;
  justify-content: space-between;
`;
