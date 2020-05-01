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
} from "../ProjectReducer/store";
import CreateTask from "../CreateTask";
import { Button, Badge, DropdownButton, Dropdown } from "react-bootstrap";
import { Icon, Label } from "semantic-ui-react";
import { Menu, DropUp, Cover } from "../Home/style";

const Tasks = () => {
  const { projectId } = useParams();
  const history = useHistory();
  const tasks = useSelector(({ project: { tasks } }) => tasks);
  const single_project = useSelector(({ project: { project } }) => project);
  const delete_task = useSelector(
    ({ project: { delete_task } }) => delete_task
  );
  const update_task = useSelector(
    ({ project: { update_task } }) => update_task
  );

  const single_task = useSelector(({ project: { task } }) => task);

  const reviews =
    (tasks !== null && tasks.filter((task) => task.status === "review")) ||
    null;
  const finishes =
    (tasks !== null && tasks.filter((task) => task.status === "finish")) ||
    null;
  const starts =
    (tasks !== null && tasks.filter((task) => task.status === "start")) || null;
  console.log({ finishes, tasks });
  const dispatch = useDispatch();

  useEffect(() => {
    getTasks(dispatch, parseInt(projectId));
    getSingleProject(dispatch, projectId);
  }, [delete_task, update_task, single_task]);

  const [show, setShow] = useState("");

  const handleDelete = (id) => {
    deleteTask(dispatch, parseInt(id));
    setShow("");
  };
  const handleEdit = (id) => {
    setShow("");
    history.push(`/tasks/${projectId}`);
  };

  const [shows, setShows] = useState(false);

  const handleShow = () => setShows(true);
  const handleClose = () => setShows(false);

  return (
    <Container>
      <Button
        variant='danger'
        onClick={() => history.push("/dashboard")}
        style={{ marginBottom: "1em", cursor: "pointer" }}
      >
        {" "}
        Go Back
      </Button>
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
            {starts !== null &&
              starts.map((task) => (
                <Display>
                  <p>{task.project_sequence}</p>
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
          <h1>Review</h1>
          <Task>
            {reviews !== null &&
              reviews.map((task) => (
                <Display>
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
            {finishes !== null &&
              finishes.map((task) => (
                <Display>
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
  padding: 5%;
  background: #f9fbfc;

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
  background: violet;
  margin-bottom: 0.8em;
  color: #ffffff;

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
  &::-webkit-scrollbar {
    /* display: none; */
    width: 2px;
  }
  &::-webkit-scrollbar-thumb {
    /* display: none; */
    width: 1.5px;
    background-color: orangered;
  }
`;

export const P = styled.p`
  font-size: 1.8em;
  font-weight: 800;
  color: orangered;
`;