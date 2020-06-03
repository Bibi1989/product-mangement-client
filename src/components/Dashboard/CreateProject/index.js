import React, { useState, useEffect } from "react";
import { Container, H1 } from "../../UsersComponent/LoginComponent/style";
import { Form, Input } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addProject,
  updateProject,
  clearCurrent,
} from "../ProjectReducer/store";
import { Button, Modal, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { memo } from "react";

const CreateProject = ({ show, handleClose, single }) => {
  // const [show, setShow] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const token = JSON.parse(sessionStorage.getItem("token"));

  const loading = useSelector(({ user: { loading } }) => loading);
  const updated_project = useSelector(
    ({ user: { updated_project } }) => updated_project
  );

  const current = useSelector(({ project: { current } }) => current);
  console.log({ current });

  const edit = single !== undefined &&
    single !== null && {
      project_name: single.project_name,
      description: single.description,
      project_identifier: single.project_identifier,
      start_date: single.start_date,
      end_date: single.end_date,
    };
  const [values, setValues] = useState({
    project_name: "",
    description: "",
    project_identifier: "",
    start_date: "",
    end_date: "",
  });
  useEffect(() => {
    setValues(current !== null && current);

    // eslint-disable-next-line
  }, [single, current]);

  const handleValues = ({ target: { name, value } }) => {
    setValues({
      ...values,
      [name]: value,
    });
  };
  const onsubmit = (e) => {
    e.preventDefault();

    addProject(dispatch, values, history, handleClose);
    // handleClose();
  };

  const onupdate = (e) => {
    e.preventDefault();

    updateProject(dispatch, current.id, values, history, handleClose);
    clearCurrent(dispatch);
  };

  if (!token) {
    history.push("/");
  }

  return (
    <Container>
      <Modal
        show={show}
        onHide={handleClose}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header>
          <Modal.Title>
            <H1>{current === null ? "Add Project" : "Edit Project"}</H1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={updateProject}>
            <Form.Field>
              <label>Project Name</label>
              <input
                placeholder='Project Name'
                name='project_name'
                onChange={handleValues}
                value={values.project_name}
              />
            </Form.Field>
            <Form.Field>
              <label>Description</label>
              <input
                placeholder='Description'
                name='description'
                onChange={handleValues}
                value={values.description}
              />
            </Form.Field>
            <Form.Field>
              <label>Privacy Status</label>
              <input
                placeholder='Privacy Status'
                name='project_identifier'
                onChange={handleValues}
                // value={values.project_identifier}
                disabled={single === null ? false : true}
              />
            </Form.Field>
            <Form.Field>
              <label>Start Date</label>
              <input
                placeholder='Start Date (2020-05-21)'
                name='start_date'
                onChange={handleValues}
                value={values.start_date}
              />
            </Form.Field>
            <Form.Field>
              <label>Due Date</label>
              <input
                placeholder='Due Date (2020-05-21)'
                name='end_date'
                onChange={handleValues}
                value={values.end_date}
              />
            </Form.Field>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='success'
            disabled={loading && true}
            onClick={current ? onupdate : onsubmit}
            type='submit'
            style={{ display: "block", margin: "1.5em auto" }}
          >
            {loading && (
              <Spinner animation='border' variant='white' size='sm' />
            )}{" "}
            {current === null ? "Add Project" : "Edit Project"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* <ModalProject show={shows} handleClose={handleClose} /> */}
    </Container>
  );
};

export default memo(CreateProject);
