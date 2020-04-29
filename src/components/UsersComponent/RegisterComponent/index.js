import React, { useState } from "react";
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
} from "../LoginComponent/style";
import { Form, Button } from "semantic-ui-react";
import { useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../userRedux/store";

const Register = () => {
  const [visible] = useState(true);
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
      {visible && <Close onClick={() => history.push("/")}>&times;</Close>}
      {visible && (
        <Modal>
          <ModalContent>
            <ModalHeader>
              <H1>Register Here</H1>
            </ModalHeader>
            <ModalBody>
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
                If you have register already click{" "}
                <Link to='/login'>
                  <span>Login</span>
                </Link>
                to login
              </Div>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};

export default Register;
