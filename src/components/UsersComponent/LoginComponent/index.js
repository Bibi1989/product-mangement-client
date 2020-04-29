import React, { useState } from "react";
import { Container } from "./style";
import { Form, Button, Modal } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../userRedux/store";

const Login = () => {
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
      <Modal trigger={<button className='btn-login'>Sign In</button>}>
        <Modal.Header>Login Here</Modal.Header>
        <Modal.Content image>
          <Modal.Description>
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
                style={{ display: "block", margin: "1.5em auto" }}
              >
                Login
              </Button>
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    </Container>
  );
};

export default Login;
