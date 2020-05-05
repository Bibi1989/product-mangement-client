import React, { useState } from "react";
import { Container, Loading } from "./style";
import { Form, Input } from "semantic-ui-react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../userRedux/store";
import { Button, Modal, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { loading } from "../userRedux/store";

const Login = ({ handleCloseLogin, show }) => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  // const [loading, setLoading] = useState(false);

  let path = window.location.href.split("/").slice(1, 3).join("");
  path = `http://${path}`;

  const token = JSON.parse(sessionStorage.getItem("token"));
  // const [show, setShow] = useState(false);
  if (token && !loading) {
    history.push("/dashboard");
  }

  const errors = useSelector(({ user: { errors } }) => errors);

  const users = useSelector(({ user: { login_user } }) => login_user);

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
    if (users === null) {
      // setLoading(true);
    }
  };

  // if (loading) {
  //   return (
  //     <Loading>
  //       <Spinner animation='border' variant='success' />
  //       <Button
  //       // onClick={() => {
  //       //   setLoading(false);
  //       // }}
  //       >
  //         Cancel
  //       </Button>
  //     </Loading>
  //   );
  // }

  return (
    <Container>
      <Modal
        show={show}
        onHide={() => handleCloseLogin(setValues)}
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
          {errors !== null && (
            <p style={{ color: "red" }}>You are yet to register</p>
          )}
          <Form onSubmit={onsubmit}>
            <Form.Field
              id='form-input-control-error-email'
              control={Input}
              label='Email Address'
              placeholder='Email Address'
              name='email'
              onChange={handleValues}
              error={
                errors &&
                values.email === "" && {
                  content: "Please enter a valid email address",
                  pointing: "below",
                }
              }
            />
            <Form.Field
              id='form-input-control-error-email'
              control={Input}
              label='Password'
              placeholder='Password'
              name='password'
              onChange={handleValues}
              error={
                errors &&
                values.password === "" && {
                  content: "Please enter a valid password",
                  pointing: "below",
                }
              }
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={onsubmit}
            type='submit'
            style={{ display: "block", margin: "1.5em auto" }}
          >
            {loading && (
              <Spinner animation='border' variant='white' size='sm' />
            )}{" "}
            Login
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Login;
