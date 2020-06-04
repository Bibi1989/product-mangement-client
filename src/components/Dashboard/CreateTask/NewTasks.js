import React, { useState, useEffect } from "react";
import { Form, Select } from "semantic-ui-react";
import { Accordion, Card, Button, Spinner } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import {
  addProject,
  updateProject,
  createTask,
  getOne,
  notifyMe,
} from "../ProjectReducer/store";

const priortyList = [
  { key: "fe", value: "frontend", text: "Front End" },
  { key: "be", value: "backend", text: "Back End" },
];

export const TaskComponent = () => {
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

    // eslint-disable-next-line
  }, [updateState, addTask]);

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

  if (!token) {
    history.push("/");
  }

  return (
    <AccordionStyle>
      <Card>
        <Card.Header>
          <Accordion.Toggle
            as={Button}
            variant='link'
            style={{
              color: "#fff",
              width: "100%",
              textAlign: "left",
              background: "teal",
            }}
            eventKey='0'
          >
            Add a task
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey='0'>
          <Form onSubmit={onsubmit} style={{ padding: "1em" }}>
            <Form.Field>
              <label>Summary</label>
              <input
                placeholder='Summary'
                name='summary'
                onChange={handleValues}
                value={values.project_name}
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
                value={values.end_date}
              />
            </Form.Field>
            <Button
              variant='success'
              disabled={loading && true}
              onClick={onsubmit}
              // type='submit'
              style={{ display: "block", margin: "1.5em auto" }}
            >
              {loading && (
                <Spinner animation='border' variant='white' size='sm' />
              )}{" "}
              Add Task
            </Button>
          </Form>
        </Accordion.Collapse>
      </Card>
    </AccordionStyle>
  );
};

const AccordionStyle = styled(Accordion)`
  background: #f9fbfc;

  .card-header {
    background: #f9fbfc;
    margin: 0 !important;
    padding: 0 !important;
    width: 100%;
  }
`;

{
  /*  */
}
