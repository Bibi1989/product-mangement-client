import React, { useState, useEffect } from "react";
import {
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  ModalContent,
  H1,
  Close,
} from "./style";
import { Form, Button } from "semantic-ui-react";
import { useLocation, useHistory } from "react-router-dom";

const Login = () => {
  const [visible, setVisible] = useState(true);
  const path = useLocation().pathname.split("/")[1];
  const history = useHistory();

  // useEffect(() => {
  //   if (path === "login") {
  //     setVisible(true);
  //   }
  // }, [visible]);
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
              <Form>
                <Form.Field>
                  <label>Email Address</label>
                  <input placeholder='Email Address' name='email' />
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

export default Login;
