import React, { useState } from "react";
import { Container } from "../LoginComponent/style";
import { Form } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../userRedux/store";
import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Register = ({ handleClose, show }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const token = JSON.parse(sessionStorage.getItem("token"));
  if (token) {
    history.push("/dashboard");
  }

  const [values, setValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleValues = ({ target: { name, value } }) => {
    setValues({
      ...values,
      [name]: value,
    });
  };
  const onsubmit = (e) => {
    e.preventDefault();

    registerUser(dispatch, values, history);
  };

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
            <h1>Register Here</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onsubmit}>
            <Form.Field>
              <label>First Name</label>
              <input
                placeholder='First Name'
                name='first_name'
                onChange={handleValues}
              />
            </Form.Field>
            <Form.Field>
              <label>Last Name</label>
              <input
                placeholder='Last Name'
                name='last_name'
                onChange={handleValues}
              />
            </Form.Field>
            <Form.Field>
              <label>Email Address</label>
              <input
                placeholder='Email Address'
                name='email'
                onChange={handleValues}
              />
            </Form.Field>
            <Form.Field>
              <label>Phone Number</label>
              <input
                placeholder='Phone Number'
                name='phone'
                onChange={handleValues}
              />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input
                placeholder='Password'
                name='password'
                onChange={handleValues}
              />
            </Form.Field>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={onsubmit}
            type='submit'
            style={{ display: "block", margin: "1.5em auto" }}
          >
            Register
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Register;
