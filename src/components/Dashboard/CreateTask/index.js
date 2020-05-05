import React, { useState, useEffect } from "react";
import {
  Container,
  Modals,
  ModalHeader,
  ModalBody,
  ModalContent,
  H1,
  Close,
} from "../../UsersComponent/LoginComponent/style";
import { Form, Buttons, Icon, Modalss, Select } from "semantic-ui-react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addProject,
  updateProject,
  createTask,
  getOne,
  notifyMe,
} from "../ProjectReducer/store";
import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const priortyList = [
  { key: "lw", value: "low", text: "Low" },
  { key: "md", value: "medium", text: "Medium" },
  { key: "hg", value: "high", text: "High" },
];

const CreateTask = ({ show, handleClose }) => {
  const { projectId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const token = JSON.parse(sessionStorage.getItem("token"));
  const user = JSON.parse(sessionStorage.getItem("project_user"));
  const [updateState, setUpdateState] = useState(false);

  const [values, setValues] = useState({
    summary: "",
    project_sequence: "",
    status: "",
    due_date: "",
  });
  const [selects, setSelects] = useState("low");
  useEffect(() => {
    getOne(dispatch, projectId);
    // eslint-disable-next-line
  }, [updateState]);

  const handleValues = ({ target: { name, value } }) => {
    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleSelect = ({ target: { textContent } }) => {
    setSelects(textContent.toLowerCase());
  };
  const onsubmit = (e) => {
    e.preventDefault();

    createTask(
      dispatch,
      parseInt(projectId),
      { ...values, priorty: selects },
      history
    );
    getOne(dispatch, projectId);
    notifyMe(dispatch, "You added a new task", parseInt(projectId), null);
    handleClose();
    setUpdateState(!updateState);
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
            <H1>Add Tasks</H1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onsubmit}>
            <Form.Field>
              <label>Summary</label>
              <input
                placeholder='Summary'
                name='summary'
                onChange={handleValues}
                // value={values.project_name}
              />
            </Form.Field>
            <Form.Field>
              <label>Priorty</label>
              {/* <input
                placeholder='Priorty'
                name='priorty'
                onChange={handleValues}
                // value={values.description}
              /> */}
              <Select
                placeholder='Select your country'
                options={priortyList}
                onChange={handleSelect}
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
                // value={values.end_date}
              />
            </Form.Field>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='success'
            // type='submit'
            style={{ display: "block", margin: "auto" }}
            onClick={onsubmit}
          >
            Add Task
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default CreateTask;
