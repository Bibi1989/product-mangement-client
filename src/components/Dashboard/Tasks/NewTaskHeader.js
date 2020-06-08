import React from "react";
import styled from "styled-components";
import { Accordion, Card } from "react-bootstrap";
import { Icon, Form, Button } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

const NewTaskHeader = ({
  notifyMe,
  inviteUser,
  single_project,
  projectId,
  handleInvite,
  email,
}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  return (
    <div>
      <Headers>
        <Icon
          name='home'
          size='big'
          style={{
            color: "orangered",
            marginBottom: "0.7em",
            cursor: "pointer",
          }}
          onClick={() => history.push("/dashboard")}
        />
        <P>
          <span>{single_project !== null && single_project.project_name}</span>
        </P>
      </Headers>

      {/* accordion */}
      <Accordion style={{ marginBottom: "2em" }}>
        <Card>
          <Card.Header>
            <Accordion.Toggle
              as={Button}
              variant='link'
              style={{
                color: "#fff",
                textAlign: "left",
                background: "teal",
              }}
              eventKey='0'
            >
              Invite
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey='0'>
            <Form style={{ padding: "1em" }}>
              <Form.Field
                style={{
                  marginRight: "1em",
                  display: "flex",
                  alignSelf: "center",
                }}
              >
                <input
                  placeholder={`Invite member to ${
                    single_project !== null && single_project.project_name
                  }`}
                  onChange={handleInvite}
                  style={{
                    padding: "1em",
                    width: "100%",
                    marginRight: "0.5em",
                  }}
                />
                <Button
                  onClick={() => {
                    notifyMe(dispatch, "You invited a member", projectId, null);
                    inviteUser(dispatch, projectId, email);
                  }}
                >
                  Invite
                </Button>
              </Form.Field>
            </Form>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  );
};

export default NewTaskHeader;

export const Headers = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const P = styled.p`
  font-size: 1.5em;
  font-weight: 500;
  color: #555555;
  display: flex;
  flex-direction: column;

  .admin {
    color: teal;
    font-size: 0.8em;
  }
`;
