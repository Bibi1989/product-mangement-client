import React, { useState, useEffect } from "react";
import { Container, H1 } from "../../UsersComponent/LoginComponent/style";
import { Form } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProject, updateProject } from "../ProjectReducer/store";
import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const CreateProject = ({ show, handleClose, single }) => {
  // const [show, setShow] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const token = JSON.parse(sessionStorage.getItem("token"));

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
    setValues(edit);

    // eslint-disable-next-line
  }, [single]);

  const handleValues = ({ target: { name, value } }) => {
    setValues({
      ...values,
      [name]: value,
    });
  };
  const onsubmit = (e) => {
    e.preventDefault();

    addProject(dispatch, values, history);
    handleClose();
  };

  const onupdate = (e) => {
    e.preventDefault();
    updateProject(dispatch, single.id, values, history);
    handleClose();
  };

  if (!token) {
    history.push("/");
  }

  // const [shows, setShows] = useState(false);

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
            <H1>{single === null ? "Add Project" : "Edit Project"}</H1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={single ? onupdate : onsubmit}>
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
            // type='submit'
            style={{ display: "block", margin: "auto" }}
            onClick={single ? onupdate : onsubmit}
          >
            {single === null ? "Add Project" : "Edit Project"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* <ModalProject show={shows} handleClose={handleClose} /> */}
    </Container>
  );
};

export default CreateProject;

export const ModalProject = ({ show, handleClose }) => {
  console.log(show);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body></Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>
          Close
        </Button>
        <Button variant='primary' onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
