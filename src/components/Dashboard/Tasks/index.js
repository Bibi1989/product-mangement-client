import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import {
  getTasks,
  deleteTask,
  updateTask,
  getOne,
  getSingleProject,
  inviteUser,
} from "../ProjectReducer/store";
import CreateTask from "../CreateTask";
import { Button, Spinner, InputGroup } from "react-bootstrap";
import { Icon, Input, Form } from "semantic-ui-react";
import { Menu, DropUp, Cover, TaskHeader } from "../Home/style";

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
  }, [delete_task, update_task, single_task]);

  const [show, setShow] = useState("");

  const [open, setOpen] = useState(false);

  const handleDelete = (id) => {
    deleteTask(dispatch, parseInt(id));
    setShow("");
  };
  const handleEdit = (id) => {
    setShow("");
    history.push(`/tasks/${projectId}`);
  };
  const [email, setEmail] = useState("");

  const handleInvite = ({ target: { value } }) => {
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
          size='huge'
          style={{
            color: "orangered",
            marginBottom: "0.7em",
            cursor: "pointer",
          }}
          onClick={() => history.push("/dashboard")}
        />
        <Form.Field
          style={{ marginRight: "1em", display: "flex", alignSelf: "center" }}
        >
          <input
            placeholder='Invite member'
            onChange={handleInvite}
            style={{ padding: "0.5em 1em" }}
          />
          <Button onClick={() => inviteUser(dispatch, projectId, email)}>
            Invite
          </Button>
        </Form.Field>
      </Headers>
      <P>{single_project !== null && single_project.project_name}</P>
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
                  <TaskHeader>
                    <p>{task.project_sequence}</p>
                    <p>Added by {task.priorty}</p>
                  </TaskHeader>
                  <p>{task.summary}</p>
                  <div className='status'>
                    <p>{task.createdAt}</p>
                    <Cover>
                      <Icon
                        className='arrow'
                        name='arrow right'
                        color='orange'
                        size='big'
                        onClick={() => {
                          updateTask(dispatch, task.id, task, "review");
                        }}
                      ></Icon>
                      <Menu
                        onClick={() => {
                          setOpen(!open);
                          setShow(task.id);
                        }}
                      >
                        <span></span>
                        <span></span>
                        <span></span>
                        <DropUp
                          className={show === task.id && open && "show"}
                          background='white'
                        >
                          <p onClick={() => handleEdit(task.id)}>
                            <Icon name='edit' color='teal' />
                          </p>
                          <p onClick={() => handleDelete(task.id)}>
                            <Icon name='cut' color='orange' />
                          </p>
                        </DropUp>
                      </Menu>
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
                  <p>{task.project_sequence}</p>
                  <p>{task.summary}</p>
                  <div className='status'>
                    <p>{task.createdAt}</p>
                    <Cover>
                      <Icon
                        className='arrow'
                        name='arrow left'
                        color='orange'
                        size='big'
                        onClick={() => {
                          updateTask(dispatch, task.id, task, "start");
                        }}
                      ></Icon>
                      <Icon
                        className='arrow'
                        name='arrow right'
                        color='orange'
                        size='big'
                        onClick={() => {
                          updateTask(dispatch, task.id, task, "finish");
                        }}
                      ></Icon>
                      <Menu onClick={() => setShow(task.id)}>
                        <span></span>
                        <span></span>
                        <span></span>
                        <DropUp
                          className={show === task.id && "show"}
                          background='white'
                        >
                          <p onClick={() => handleEdit(task.id)}>
                            <Icon name='edit' color='teal' />
                          </p>
                          <p onClick={() => handleDelete(task.id)}>
                            <Icon name='cut' color='orange' />
                          </p>
                        </DropUp>
                      </Menu>
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
                  <p>{task.project_sequence}</p>
                  <p>{task.summary}</p>
                  <div className='status'>
                    <p>{task.createdAt}</p>
                    <Cover>
                      <Icon
                        className='arrow'
                        name='arrow left'
                        color='orange'
                        size='big'
                        onClick={() => {
                          updateTask(dispatch, task.id, task, "review");
                        }}
                      ></Icon>
                      <Menu onClick={() => setShow(task.id)}>
                        <span></span>
                        <span></span>
                        <span></span>
                        <DropUp
                          className={show === task.id && "show"}
                          background='white'
                        >
                          <p onClick={() => handleEdit(task.id)}>
                            <Icon name='edit' color='teal' />
                          </p>
                          <p onClick={() => handleDelete(task.id)}>
                            <Icon name='cut' color='orange' />
                          </p>
                        </DropUp>
                      </Menu>
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
  padding: 5% 10%;
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
  font-size: 1.8em;
  font-weight: 800;
  color: orangered;
`;
export const Headers = styled.div`
  display: flex;
  justify-content: space-between;
`;
