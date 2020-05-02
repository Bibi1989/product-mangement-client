import React, { useState } from "react";
import { Container, Loading } from "../LoginComponent/style";
import { Form, Input } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../userRedux/store";
import { Button, Modal, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";

const Register = ({ handleClose, show }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const token = JSON.parse(sessionStorage.getItem("token"));
  if (token) {
    history.push("/dashboard");
  }

  const users = useSelector(({ user: { register_user } }) => register_user);
  const errors = useSelector(({ user: { errors } }) => errors);

  const [values, setValuesRegister] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleValues = ({ target: { name, value } }) => {
    setValuesRegister({
      ...values,
      [name]: value,
    });
  };
  const onsubmit = (e) => {
    e.preventDefault();

    registerUser(dispatch, values, history);

    if (users === null) {
      setLoading(true);
    }
  };

  // if (loading) {
  //   return (
  //     <Loading>
  //       <Spinner animation='border' variant='success' />
  //       <Button
  //         onClick={() => {
  //           setLoading(false);
  //         }}
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
        onHide={() => handleClose(setValuesRegister)}
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
            {/* <Form.Field>
              <label>First Name</label>
              <input
                placeholder='First Name'
                name='first_name'
                onChange={handleValues}
              />
            </Form.Field> */}
            <Form.Field
              id='form-input-control-error-email'
              control={Input}
              label='First Name'
              placeholder='First Name'
              name='first_name'
              onChange={handleValues}
              error={
                errors &&
                values.first_name === "" && {
                  content: "Please enter First Name",
                  pointing: "below",
                }
              }
            />
            <Form.Field
              id='form-input-control-error-email'
              control={Input}
              label='Last Name'
              placeholder='Last Name'
              name='last_name'
              onChange={handleValues}
              error={
                errors &&
                values.last_name === "" && {
                  content: "Please enter Last Name",
                  pointing: "below",
                }
              }
            />
            {/* <Form.Field>
              <label>Last Name</label>
              <input
                placeholder='Last Name'
                name='last_name'
                onChange={handleValues}
              />
            </Form.Field> */}
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
                  content: "Please enter Email Address",
                  pointing: "below",
                }
              }
            />
            {/* <Form.Field>
              <label>Email Address</label>
              <input
                placeholder='Email Address'
                name='email'
                onChange={handleValues}
              />
            </Form.Field> */}
            <Form.Field
              id='form-input-control-error-email'
              control={Input}
              label='Phone Number'
              placeholder='Phone Number'
              name='phone'
              onChange={handleValues}
              error={
                errors &&
                values.phone === "" && {
                  content: "Please enter Phone Number",
                  pointing: "below",
                }
              }
            />
            {/* <Form.Field>
              <label>Phone Number</label>
              <input
                placeholder='Phone Number'
                name='phone'
                onChange={handleValues}
              />
            </Form.Field> */}
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
            {/* <Form.Field>
              <label>Password</label>
              <input
                placeholder='Password'
                name='password'
                onChange={handleValues}
              />
            </Form.Field> */}
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
