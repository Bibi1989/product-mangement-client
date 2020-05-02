import React, { useState } from "react";
import { Container, Loading } from "./style";
import { Form } from "semantic-ui-react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../userRedux/store";
import { Button, Modal, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = ({ handleCloseLogin, show }) => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  let path = window.location.href.split("/").slice(1, 3).join("");
  path = `http://${path}`;

  const token = JSON.parse(sessionStorage.getItem("token"));
  // const [show, setShow] = useState(false);
  if (token) {
    history.push("/dashboard");
  }

  const users = useSelector(({ user: { login_user } }) => login_user);

  console.log(users);

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  // React.useEffect(() => {
  //   if (!token) {
  //     console.log("no token");
  //     return (
  //       <Loading>
  //         <Spinner animation='border' variant='success' />
  //       </Loading>
  //     );
  //   }
  // }, [users]);

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
      setLoading(true);
    }
  };

  if (loading) {
    return (
      <Loading>
        <Spinner animation='border' variant='success' />
      </Loading>
    );
  }

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
