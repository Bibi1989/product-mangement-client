import React, { useState, useEffect } from "react";
import {
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  ModalContent,
  H1,
  Close,
  Div,
  ModalFooter,
} from "../../UsersComponent/LoginComponent/style";
import { Form, Button } from "semantic-ui-react";
import { useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addProject, updateProject } from "../ProjectReducer/store";

const CreateProject = () => {
  const [visible] = useState(true);
  const history = useHistory();
  const dispatch = useDispatch();
  const token = JSON.parse(sessionStorage.getItem("token"));

  const single = useSelector(({ project: { project } }) => project);
  console.log(single);
  const edit = single !== null && {
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
  }, single);

  const handleValues = ({ target: { name, value } }) => {
    setValues({
      ...values,
      [name]: value,
    });
  };
  const onsubmit = (e) => {
    e.preventDefault();

    addProject(dispatch, values, history);
  };
  const onupdate = (e) => {
    e.preventDefault();

    updateProject(dispatch, single.id, values, history);
  };

  if (!token) {
    history.push("/login");
  }

  return (
    <Container>
      {visible && <Close onClick={() => history.push("/")}>&times;</Close>}
      {visible && (
        <Modal>
          <ModalContent width='60%'>
            <ModalHeader>
              <H1>{single === null ? "Add Project" : "Edit Project"}</H1>
            </ModalHeader>
            <ModalBody>
              <Form onSubmit={single === null ? onsubmit : onupdate}>
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
                <Button
                  type='submit'
                  style={{ display: "block", margin: "auto" }}
                >
                  {single === null ? "Add Project" : "Edit Project"}
                </Button>
              </Form>
            </ModalBody>
            {/* <ModalFooter>
              <Div>
                If you have register already click{" "}
                <Link to='/login'>
                  <span>Login</span>
                </Link>
                to login
              </Div>
            </ModalFooter> */}
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};

export default CreateProject;
