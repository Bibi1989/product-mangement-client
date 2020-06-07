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
  getCurrentTask,
} from "../ProjectReducer/store";
import CreateTask from "../CreateTask";
// import NewTasks from "../CreateTask/NewTasks";
import { Accordion, Card } from "react-bootstrap";
import { Icon, Form, Dropdown, Button, Popup, Modal } from "semantic-ui-react";
import { Cover, TaskHeader } from "../Home/style";
import { TaskComponent } from "../CreateTask/NewTasks";
import { DragDropContext } from "react-beautiful-dnd";
import Menu from "./Menu";

const Tasks = () => {
  // const user = JSON.parse(sessionStorage.getItem("project_user"));
  const { projectId } = useParams();
  const history = useHistory();

  const [bool, setBool] = useState(false);

  let tasks = useSelector(({ project: { tasks } }) => tasks);
  const single_project = useSelector(({ project: { project } }) => project);
  const delete_task = useSelector(
    ({ project: { delete_task } }) => delete_task
  );
  const update_task = useSelector(
    ({ project: { update_task } }) => update_task
  );
  const loading = useSelector(({ project: { loading } }) => loading);

  const current_task = useSelector(
    ({ project: { current_task } }) => current_task
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

    // eslint-disable-next-line
  }, [delete_task, update_task, single_task, bool, current_task]);

  // const notify = useSelector(({ project: { notify } }) => notify);

  const [show, setShow] = useState("");

  const handleDelete = (id) => {
    deleteTask(dispatch, parseInt(id));
    notifyMe(dispatch, "You deleted a task", projectId, id);
    setShow("");
  };
  const handleEdit = (task) => {
    getCurrentTask(dispatch, task);
    notifyMe(dispatch, "You edited a task", projectId);
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

  const onDragEnd = (result) => {};

  return (
    <DragDropContext onDragEnd={onDragEnd}>
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
          <P>
            <span>
              {single_project !== null && single_project.project_name}
            </span>
          </P>
        </Headers>

        {/* accordion */}
        <Accordion style={{ marginBottom: "2em" }}>
          <Card>
            <Card.Header>
              <Accordion.Toggle
                as={Button}
                variant='link'
                style={{
                  color: "#fff",
                  textAlign: "left",
                  background: "teal",
                }}
                eventKey='0'
              >
                Invite
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey='0'>
              <Form style={{ padding: "1em" }}>
                <Form.Field
                  style={{
                    marginRight: "1em",
                    display: "flex",
                    alignSelf: "center",
                  }}
                >
                  <input
                    placeholder={`Invite member to ${
                      single_project !== null && single_project.project_name
                    }`}
                    onChange={handleInvite}
                    style={{
                      padding: "1em",
                      width: "100%",
                      marginRight: "0.5em",
                    }}
                  />
                  <Button
                    onClick={() => {
                      notifyMe(
                        dispatch,
                        "You invited a member",
                        projectId,
                        null
                      );
                      inviteUser(dispatch, projectId, email);
                    }}
                  >
                    Invite
                  </Button>
                </Form.Field>
              </Form>
            </Accordion.Collapse>
          </Card>
        </Accordion>

        {/* <P>
          <span>{single_project !== null && single_project.project_name}</span>
        </P> */}
        <Row>
          <Col>
            <h1>Start</h1>
            <Task>
              {starts !== null &&
                starts.map((task) => (
                  <Display key={task.id} draggable={true}>
                    <TaskHeader color={task.project_sequence}>
                      <div
                        title={
                          task.priorty === "front end"
                            ? "Front End"
                            : "Back End"
                        }
                        className={
                          task.priorty === "front end" ? "front" : "back"
                        }
                      ></div>
                      <p className='added_person'>
                        {task.User !== null &&
                          task.User.first_name.slice(0, 1).toUpperCase() +
                            task.User.last_name.slice(0, 1).toUpperCase()}
                      </p>
                    </TaskHeader>
                    <p>{task.summary}</p>
                    <div className='status'>
                      <p>{task.createdAt}</p>
                      <Cover>
                        <Dropdown
                          icon='ellipsis vertical'
                          floating
                          labeled
                          className='icon'
                        >
                          <Dropdown.Menu
                            style={{
                              marginLeft: "-80px",
                              position: "absolute",
                              zIndex: "20",
                            }}
                          >
                            <Dropdown.Header icon='tags' content='Actions' />
                            <Dropdown.Divider />
                            <Dropdown.Item>
                              <p onClick={() => handleEdit(task)}>
                                <Icon name='edit' color='teal' /> Edit
                              </p>
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <p onClick={() => handleDelete(task.id)}>
                                <Icon name='cut' color='orange' /> Delete
                              </p>
                            </Dropdown.Item>
                            <Dropdown.Item>
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

                        <Menu
                          task={task}
                          updateTask={updateTask}
                          handleEdit={handleEdit}
                          handleDelete={handleDelete}
                          current_task={current_task}
                        />
                      </Cover>
                    </div>
                  </Display>
                ))}
              <TaskComponent current_task={current_task} />
            </Task>
          </Col>
          <Col>
            <h1>Review</h1>
            <Task>
              {reviews !== null &&
                reviews.map((task) => (
                  <Display key={task.id} draggable={true}>
                    <TaskHeader color={task.project_sequence}>
                      <div
                        title={
                          task.priorty === "front end"
                            ? "Front End"
                            : "Back End"
                        }
                        className={
                          task.priorty === "front end" ? "front" : "back"
                        }
                      ></div>
                      <p className='added_person'>
                        {task.User !== null &&
                          task.User.first_name.slice(0, 1).toUpperCase() +
                            task.User.last_name.slice(0, 1).toUpperCase()}
                      </p>
                    </TaskHeader>
                    <p>{task.summary}</p>
                    <div className='status'>
                      <p>{task.createdAt}</p>
                      <Cover>
                        <Dropdown
                          icon='ellipsis vertical'
                          floating
                          labeled
                          className='icon'
                        >
                          <Dropdown.Menu style={{ marginLeft: "-160px" }}>
                            <Dropdown.Header icon='tags' content='Actions' />
                            <Dropdown.Divider />
                            <Dropdown.Item>
                              <p
                                onClick={() => {
                                  updateTask(dispatch, task.id, task, "start");
                                }}
                              >
                                <Icon name='arrow left' color='orange'></Icon>{" "}
                                Move back To Start
                              </p>
                            </Dropdown.Item>
                            <Dropdown.Item>
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
              {finishes !== null &&
                finishes.map((task) => (
                  <Display key={task.id} draggable={true}>
                    <TaskHeader color={task.project_sequence}>
                      <div
                        title={
                          task.priorty === "front end"
                            ? "Front End"
                            : "Back End"
                        }
                        className={
                          task.priorty === "front end" ? "front" : "back"
                        }
                      ></div>
                      <p className='added_person'>
                        {task.User !== null &&
                          task.User.first_name.slice(0, 1).toUpperCase() +
                            task.User.last_name.slice(0, 1).toUpperCase()}
                      </p>
                    </TaskHeader>
                    <p>{task.summary}</p>
                    <div className='status'>
                      <p>{task.createdAt}</p>
                      <Cover>
                        <Dropdown
                          icon='ellipsis vertical'
                          floating
                          labeled
                          className='icon'
                        >
                          <Dropdown.Menu style={{ marginLeft: "-180px" }}>
                            <Dropdown.Header icon='tags' content='Actions' />
                            <Dropdown.Divider />
                            <Dropdown.Item>
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
    </DragDropContext>
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
  background: #f9fbfc;
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
  padding: 0.5em;
  background: #ffffff;
  /* background: #f9fbfc; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 0.5em;
  color: #777777;
  border-radius: 0.5em;
  box-shadow: 0px 0px 15px #eee;

  .status {
    display: flex;
    justify-content: space-between;
  }
`;

export const Task = styled.div`
  height: 60vh;
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
    background-color: #eee;
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
  font-weight: 500;
  color: #555555;
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

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 60% 40%;

  p {
    padding: 0;
    margin: 0;
  }
  .desc {
    margin-top: 1em;
  }
`;
const ModalStyle = styled(Modal)`
  width: 40% !important;
  height: 80vh !important;
  margin-left: 30% !important;

  @media (max-width: 769px) {
    width: 96% !important;
    margin-left: 2% !important;
  }
`;
const Paragraph = styled.p``;
const Flex = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1em;
  margin-bottom: 1em;

  &:first-child {
    margin-right: 1em;
  }
`;
const First = styled.div`
  .added_person {
    color: #4f5e78;
    text-align: center;
    font-weight: 600;
    width: 30px;
    height: 30px;
    line-height: 30px;
    border-radius: 50%;
    background: #dfe1e6;
  }
`;
const Second = styled.div`
  padding-left: 2em;
  p {
    padding: 1em;
    background: #f9fbfc;
    margin-bottom: 1em;
    box-shadow: 0 2px 10px #eee;
    cursor: pointer;
  }
`;

const PopDetail = ({
  task,
  handleDelete,
  handleEdit,
  updateTask,
  dispatch,
}) => {
  return (
    <ModalStyle
      trigger={<Icon name='align left' style={{ cursor: "pointer" }} />}
    >
      <Modal.Header>Actions</Modal.Header>
      <Modal.Content>
        <Wrapper>
          <First>
            <Flex>
              <Icon name='align center' />
              <p>Label</p>
            </Flex>
            <Button
              color={task.priorty === "front end" ? "orange" : "teal"}
              style={{ textTransform: "capitalize" }}
            >
              {task.priorty}
            </Button>
            <Flex>
              <Icon name='user' />
              <p className='added_person'>
                {task.User !== null &&
                  task.User.first_name.slice(0, 1).toUpperCase() +
                    task.User.last_name.slice(0, 1).toUpperCase()}
              </p>
            </Flex>

            <Flex>
              <Icon name='keyboard' />
              <p>Description</p>
            </Flex>
            <Paragraph>{task.summary}</Paragraph>
          </First>
          <Modal.Description>
            <Second>
              <p onClick={() => handleEdit(task)}>
                <Icon name='edit' color='teal' /> Edit
              </p>
              <p onClick={() => handleDelete(task.id)}>
                <Icon name='cut' color='orange' /> Delete
              </p>
              <p
                onClick={() => {
                  updateTask(dispatch, task.id, task, "review");
                }}
              >
                <Icon name='arrow right' color='orange'></Icon> Move
              </p>
            </Second>
          </Modal.Description>
        </Wrapper>
      </Modal.Content>
    </ModalStyle>
  );
};
