import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getTasks,
  getSingleProject,
  inviteUser,
  getNotifications,
  notifyMe,
} from "../ProjectReducer/store";
import TaskCard from "./TaskCard";
import NewTaskHeader from "./NewTaskHeader";

const NewTaskCards = () => {
  // const user = JSON.parse(sessionStorage.getItem("project_user"));
  const { projectId } = useParams();

  let tasks = useSelector(({ project: { tasks } }) => tasks);
  const single_project = useSelector(({ project: { project } }) => project);
  const delete_task = useSelector(
    ({ project: { delete_task } }) => delete_task
  );
  const update_task = useSelector(
    ({ project: { update_task } }) => update_task
  );
  // const loading = useSelector(({ project: { loading } }) => loading);

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
  }, [delete_task, update_task, single_task, current_task]);

  const [email, setEmail] = useState("");

  const handleInvite = ({ target: { value } }) => {
    setEmail(value);
  };

  const arrays = [
    {
      title: "Backlogs",
      boards: starts !== null && starts,
      forward: "review",
      backward: "start",
      status: "start",
      count: starts !== null && starts.length,
    },
    {
      title: "In Progress",
      boards: reviews !== null && reviews,
      forward: "finish",
      backward: "start",
      status: "review",
      count: reviews !== null && reviews.length,
    },
    {
      title: "Done",
      boards: finishes !== null && finishes,
      forward: "finish",
      backward: "review",
      status: "finish",
      count: finishes !== null && finishes.length,
    },
  ];

  return (
    <Container>
      <NewTaskHeader
        notifyMe={notifyMe}
        inviteUser={inviteUser}
        single_project={single_project}
        projectId={projectId}
        handleInvite={handleInvite}
        email={email}
      />
      <Row>
        {arrays.map((array) => {
          return (
            <TaskCard
              title={array.title}
              boards={array.boards}
              tasks={tasks}
              current_task={current_task}
              forward={array.forward}
              backword={array.backword}
              status_text={array.status}
              count={array.count}
            />
          );
        })}
      </Row>
    </Container>
  );
};

export default NewTaskCards;

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
