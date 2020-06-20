import React, { useState } from "react";
import styled from "styled-components";
import { getDateFunc } from "../../Utils/dateFunc";

import { useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import {
  deleteTask,
  updateTask,
  notifyMe,
  getCurrentTask,
} from "../ProjectReducer/store";

import { Icon, Dropdown } from "semantic-ui-react";
import { Cover, TaskHeader } from "../Home/style";
import { TaskComponent } from "../CreateTask/NewTasks";
import Menu from "./Menu";

const TaskCard = ({
  boards,
  title,
  tasks,
  current_task,
  forward,
  backward,
  status_text,
  count,
}) => {
  const [, setShow] = useState("");
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  // const [move, setMove] = useState("");

  console.log({ boards, status_text });

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

  // preventing default behavior of dragging over
  const onDragOver = (e) => {
    e.preventDefault();
  };

  // setting the id of draggable card
  const onDragStart = (e, id) => {
    e.dataTransfer.setData("id", id);
    setTimeout(() => {
      document.getElementById(`${id}`).style.display = "none";
    }, 0);
  };

  // get the id of a dragable card and update the card with the card dropped
  const onDrop = (e, text) => {
    let id = e.dataTransfer.getData("id");

    let t = tasks !== null && tasks.filter((task) => task.id === Number(id))[0];
    const new_t = {
      summary: t.summary,
      status: text,
      due_date: t.due_date,
    };
    updateTask(dispatch, Number(id), new_t, text);
  };
  return (
    <Col
      onDragOver={(e) => onDragOver(e)}
      onDrop={(e) => onDrop(e, status_text)}
    >
      <div
        style={{ display: "flex", alignItems: "center", paddingBottom: "1em" }}
      >
        <p
          style={{
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            background: "teal",
            color: "white",
            textAlign: "center",
            lineHeight: "30px",
            fontSize: "1.2em",
          }}
        >
          {count}
        </p>{" "}
        <h1 style={{ padding: "0" }}>{title}</h1>
      </div>
      <Task>
        {boards !== false &&
          boards.map((task) => (
            <Display
              key={task.id}
              draggable={true}
              onDragStart={(e) => onDragStart(e, task.id)}
              id={task.id}
            >
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
                <p>{getDateFunc(task.createdAt)}</p>
                <Cover>
                  <Dropdown
                    icon='ellipsis vertical'
                    floating
                    labeled
                    className='icon'
                  >
                    <Dropdown.Menu
                      style={{
                        marginLeft: "-160px",
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
                      {status_text !== "finish" && (
                        <Dropdown.Item>
                          <p
                            onClick={() => {
                              updateTask(dispatch, task.id, task, forward);
                            }}
                          >
                            <Icon name='arrow right' color='orange'></Icon> Move
                            To {forward}
                          </p>
                        </Dropdown.Item>
                      )}

                      {status_text === "review" && (
                        <Dropdown.Item>
                          <p
                            onClick={() => {
                              updateTask(dispatch, task.id, task, "start");
                            }}
                          >
                            <Icon name='arrow left' color='orange'></Icon> Move
                            To Start
                          </p>
                        </Dropdown.Item>
                      )}
                      <Dropdown.Item>
                        {status_text === "finish" && (
                          <p
                            onClick={() => {
                              updateTask(dispatch, task.id, task, "review");
                            }}
                          >
                            <Icon name='arrow left' color='orange'></Icon> Move
                            To Review
                          </p>
                        )}
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
  );
};

export default TaskCard;

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

  .hide {
    display: none;
  }

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
