import React, { useState } from "react";
import {
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  ModalContent,
  H1,
  Close,
  ModalFooter,
  Div,
} from "./style";
import { Form, Button } from "semantic-ui-react";
import { useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../userRedux/store";

const Login = () => {
  const [visible] = useState(true);
  const history = useHistory();
  const dispatch = useDispatch();

  const token = JSON.parse(sessionStorage.getItem("token"));
  if (token) {
    history.push("/dashboard");
  }

  const users = useSelector(({ user: { login_user } }) => login_user);

  console.log(users);

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
      {visible && <Close onClick={() => history.push("/")}>&times;</Close>}
      {visible && (
        <Modal>
          <ModalContent>
            <ModalHeader>
              <H1>Login Here</H1>
            </ModalHeader>
            <ModalBody>
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
                <Button
                  type='submit'
                  style={{ display: "block", margin: "auto" }}
                >
                  Submit
                </Button>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Div>
                If you are yet to register click
                <Link to='/register'>
                  <span>Register</span>
                </Link>
                to register
              </Div>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};

export default Login;
