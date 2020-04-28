import React, { useState, useEffect } from "react";
import {
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  ModalContent,
  H1,
  Close,
} from "../LoginComponent/style";
import { Form, Button } from "semantic-ui-react";
import { useLocation, useHistory } from "react-router-dom";

const Register = () => {
  const [visible, setVisible] = useState(true);
  const path = useLocation().pathname.split("/")[1];
  const history = useHistory();

  //   useEffect(() => {
  //     if (path === "register") {
  //       setVisible(true);
  //     }
  //   }, [visible]);

  console.log(visible);

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
              <Form>
                <Form.Field>
                  <label>First Name</label>
                  <input placeholder='First Name' name='first_name' />
                </Form.Field>
                <Form.Field>
                  <label>Last Name</label>
                  <input placeholder='Last Name' name='last_name' />
                </Form.Field>
                <Form.Field>
                  <label>Email Address</label>
                  <input placeholder='Email Address' name='email' />
                </Form.Field>
                <Form.Field>
                  <label>Phone Number</label>
                  <input placeholder='Phone Number' name='phone' />
                </Form.Field>
                <Form.Field>
                  <label>Password</label>
                  <input placeholder='Password' name='password' />
                </Form.Field>
                <Button
                  type='submit'
                  style={{ display: "block", margin: "auto" }}
                >
                  Submit
                </Button>
              </Form>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};

export default Register;
