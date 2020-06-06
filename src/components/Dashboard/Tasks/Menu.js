import React, { useState, useEffect } from "react";
import { Form, Select, Modal, Icon } from "semantic-ui-react";
import { Button, Spinner } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import {
  createTask,
  getOne,
  notifyMe,
  clearCurrent,
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

  const loading = useSelector(({ user: { loading } }) => loading);
  const addTask = useSelector(({ project: { task } }) => task);

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
                  value={selects}
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
                variant='success'
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
`;
const ModalStyle = styled(Modal)`
  width: 40% !important;
  height: 100% !important;
  margin-left: 30% !important;

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
  p {
    padding: 1em;
    background: #f9fbfc;
    margin-bottom: 1em;
    box-shadow: 0 2px 10px #eee;
    cursor: pointer;
  }
`;
