import React from "react";
import styled from "styled-components";
import {
  getTasks,
  deleteTask,
  updateTask,
  inviteUser,
  getNotifications,
  notifyMe,
  getCurrentTask,
} from "../ProjectReducer/store";
import CreateTask from "../CreateTask";
// import NewTasks from "../CreateTask/NewTasks";
import { Accordion, Card } from "react-bootstrap";
import { Icon, Form, Dropdown, Button, Popup } from "semantic-ui-react";
import { Cover, TaskHeader } from "../Home/style";
import { TaskComponent } from "../CreateTask/NewTasks";
import { DragDropContext } from "react-beautiful-dnd";

const Cards = ({
  title,
  starts,
  handleDelete,
  handleEdit,
  updateTask,
  dispatch,
  current_task,
}) => {
  return (
    <Col>
      <h1>{title}</h1>
      <Task>
        {starts !== null &&
          starts.map((task) => (
            <Display key={task.id} draggable={true}>
              <TaskHeader color={task.project_sequence}>
                <div
                  title={
                    task.priorty === "front end" ? "Front End" : "Back End"
                  }
                  className={task.priorty === "front end" ? "front" : "back"}
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
                            updateTask(dispatch, task.id, task, `${title}`);
                          }}
                        >
                          <Icon name='arrow right' color='orange'></Icon> Move
                        </p>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>

                  {/* <Popup
                        content={
                          <PopDetail
                            task={task}
                            updateTask={updateTask}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                            dispatch={dispatch}
                          />
                        }
                        on='click'
                        pinned
                        trigger={<Icon name='add' />}
                      /> */}
                </Cover>
              </div>
            </Display>
          ))}
        <TaskComponent current_task={current_task} />
      </Task>
    </Col>
  );
};

export default Cards;

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

const Wrapper = styled.div`
  width: 250px;
  display: grid;
  grid-template-columns: 70% 30%;

  p {
    padding: 0;
    margin: 0;
  }
  .desc {
    margin-top: 1em;
  }
`;
