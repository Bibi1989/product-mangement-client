import React, { useState } from "react";
import { Container } from "./style";
import { Form } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../userRedux/store";
import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = ({ handleCloseLogin, show }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const token = JSON.parse(sessionStorage.getItem("token"));
  // const [show, setShow] = useState(false);
  if (token) {
    history.push("/dashboard");
  }

  // const users = useSelector(({ user: { login_user } }) => login_user);

  const [values, setValues] = useState({
    email: "",
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

    loginUser(dispatch, values, history);
  };
  return (
    <Container>
      <Modal
        show={show}
        onHide={handleCloseLogin}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header>
          <Modal.Title>
            <h1>Login Here</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onsubmit}>
            <Form.Field>
              <label>Email Address</label>
              <input
                placeholder='Email Address'
                name='email'
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
            Login
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Login;
