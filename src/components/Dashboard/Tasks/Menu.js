import React, { useState, useEffect } from "react";
import { Form, Select, Modal, Icon, Button } from "semantic-ui-react";
import { Spinner } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Moment from "react-moment";

import {
  createTask,
  getOne,
  notifyMe,
  clearCurrent,
  deleteAllNotification,
  deleteNotification,
} from "../ProjectReducer/store";

const priortyList = [
  { key: "fe", value: "frontend", text: "Front End" },
  { key: "be", value: "backend", text: "Back End" },
];

const Menu = ({ task, handleDelete, handleEdit, updateTask, current_task }) => {
  const { projectId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const token = JSON.parse(sessionStorage.getItem("token"));
  const user = JSON.parse(sessionStorage.getItem("project_user"));
  const [updateState, setUpdateState] = useState(false);

  const [change, setChange] = useState(false);

  const loading = useSelector(({ user: { loading } }) => loading);
  const addTask = useSelector(({ project: { task } }) => task);
  const notices = useSelector(({ project: { notify } }) => notify);

  const [values, setValues] = useState({
    summary: "",
    project_sequence: "",
    status: "",
    due_date: "",
  });
  const [selects, setSelects] = useState("Front End");
  useEffect(() => {
    getOne(dispatch, projectId);
    setValues(
      current_task !== null && {
        summary: current_task.summary,
        status: current_task.status,
        due_date: current_task.due_date,
      }
    );

    // eslint-disable-next-line
  }, [updateState, addTask, current_task]);

  const handleValues = ({ target: { name, value } }) => {
    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleSelect = ({ target: { textContent } }) => {
    console.log({ textContext: textContent.toLowerCase() });
    setSelects(textContent.toLowerCase());
  };
  const onsubmit = (e) => {
    e.preventDefault();

    createTask(
      dispatch,
      parseInt(projectId),
      { ...values, priorty: selects },
      history
      // handleClose
    );
    setUpdateState(!updateState);
    setValues({
      summary: "",
      project_sequence: "",
      status: "",
      due_date: "",
    });
    setSelects("");
    // getOne(dispatch, projectId);
    notifyMe(dispatch, "You added a new task", parseInt(projectId), null);
    setUpdateState(!updateState);
  };

  const onupdate = (e) => {
    e.preventDefault();
    updateTask(
      dispatch,
      current_task !== null && current_task.id,
      values,
      "start"
    );
    setValues({
      summary: "",
      project_sequence: "",
      status: "",
      due_date: "",
    });
    clearCurrent(dispatch);
  };

  const handleNotifyDelete = (id) => {
    setChange(!change);
    deleteNotification(dispatch, id);
  };

  if (!token) {
    history.push("/");
  }

  return (
    <ModalStyle
      trigger={<Icon name='align left' style={{ cursor: "pointer" }} />}
    >
      <Modal.Header>Actions</Modal.Header>
      <Modal.Content>
        <Wrapper>
          <First>
            <Flex>
              <h5>{task.Project.project_name}</h5>
            </Flex>
            <Flex>
              <Icon name='user' />
              <p className='added_person'>
                {task.User !== null &&
                  task.User.first_name.slice(0, 1).toUpperCase() +
                    task.User.last_name.slice(0, 1).toUpperCase()}
              </p>
            </Flex>
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
              <Icon name='keyboard' />
              <p>Description</p>
            </Flex>
            <Paragraph>{task.summary}</Paragraph>
            <Form
              onSubmit={current_task ? onupdate : onsubmit}
              style={{ padding: "1em" }}
            >
              <Form.Field>
                <label>Summary</label>
                <input
                  placeholder='Summary'
                  name='summary'
                  onChange={handleValues}
                  value={values.summary}
                />
              </Form.Field>
              <Form.Field>
                <label>Label</label>
                <Select
                  placeholder='Select a label'
                  options={priortyList}
                  onChange={handleSelect}
                  value={selects.value}
                />
              </Form.Field>
              <Form.Field>
                {/* <label>Status</label> */}
                <input
                  hidden
                  placeholder='Status'
                  name='status'
                  onChange={handleValues}
                  value='start'
                />
              </Form.Field>
              <Form.Field>
                <label>Due Date</label>
                <input
                  placeholder='Due Date (2020-05-21)'
                  name='due_date'
                  onChange={handleValues}
                  value={values.due_date}
                />
              </Form.Field>
              <Button
                color={current_task ? "orange" : "teal"}
                disabled={loading && true}
                onClick={current_task ? onupdate : onsubmit}
                type='submit'
                style={{ display: "block", margin: "1.5em auto" }}
              >
                {loading && (
                  <Spinner animation='border' variant='white' size='sm' />
                )}{" "}
                {current_task ? "Edit Task" : "Add Task"}
              </Button>
            </Form>
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
            <Notces>
              <H2>Activites</H2>
              {notices !== null &&
                notices !== undefined &&
                notices.map((notice) => {
                  return (
                    <ItemStyle key={notice.id}>
                      <NotifyList>
                        <PText>{notice.notify}</PText>
                        <DateStyle>
                          <Moment fromNow>{notice.createdAt}</Moment>
                        </DateStyle>
                      </NotifyList>
                      <RemoveTag>
                        <PRemove onClick={() => handleNotifyDelete(notice.id)}>
                          &times;{" "}
                        </PRemove>
                      </RemoveTag>
                    </ItemStyle>
                  );
                })}
            </Notces>
          </Modal.Description>
        </Wrapper>
      </Modal.Content>
    </ModalStyle>
  );
};

export default Menu;

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

  @media (max-width: 769px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;
const ModalStyle = styled(Modal)`
  width: 60% !important;
  height: 100% !important;
  margin-left: 20% !important;

  @media (max-width: 769px) {
    width: 96% !important;
    margin-left: 2% !important;
    margin-top: 20% !important;
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

  @media (max-width: 769px) {
    padding-left: 0.5em;
  }
  p {
    padding: 1em;
    background: #f9fbfc;
    margin-bottom: 1em;
    box-shadow: 0 2px 10px #eee;
    cursor: pointer;
  }
`;

const Notces = styled.div`
  padding-left: 2em;

  @media (max-width: 769px) {
    padding-left: 0.5em;
  }
`;

const NotifyList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;
const H2 = styled.h2`
  padding: 1em 0;
  color: #777777;
`;
const NoActivity = styled.div``;
const ItemStyle = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1em;
  background: #f9fbfc;
  margin-bottom: 1em;
  box-shadow: 0 2px 10px #eee;
`;
const PText = styled.p`
  font-size: 1em;
  color: #333;
  padding: 0;
`;
const DateStyle = styled.span`
  font-size: 0.8em;
  color: #999999;
  padding: 0;
`;
const RemoveTag = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
`;
const PRemove = styled.p`
  font-size: 1.4em;
  padding: 0;
`;
