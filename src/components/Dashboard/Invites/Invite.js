import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Button, Spinner } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import {
  acceptInvite,
  deleteInvite,
  getInvites,
} from "../ProjectReducer/store";
import { Header } from "../Home/style";
import { Icon } from "semantic-ui-react";

const Invite = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  let invites = useSelector(({ project: { invites } }) => invites);

  React.useEffect(() => {
    getInvites(dispatch);

    // eslint-disable-next-line
  }, []);

  return (
    <Container>
      <Row>
        <Header paddingBottom='1em'>
          <Icon
            name='home'
            size='big'
            style={{
              color: "orangered",
              cursor: "pointer",
            }}
            onClick={() => history.push("/dashboard")}
          />
          <h1>Invites</h1>
        </Header>
        {invites !== null &&
          invites.map((invite) => {
            return (
              <div style={{ marginBottom: "1em" }}>
                <p>Invit from {invite.sender.split("@")[0]} to collaborate</p>
                <Button
                  variant='danger'
                  onClick={() => {
                    deleteInvite(dispatch, invite.id);
                  }}
                >
                  Decline
                </Button>
                <Button
                  style={{ marginLeft: "0.5em" }}
                  variant='success'
                  onClick={() => {
                    acceptInvite(dispatch, invite.ProjectId);
                    deleteInvite(dispatch, invite.id);
                  }}
                >
                  Accept
                </Button>
              </div>
            );
          })}
      </Row>
    </Container>
  );
};

export default Invite;

export const Container = styled.div`
  padding: 3% 15%;

  @media (max-width: 769px) {
    padding: 3% 1em;
  }
`;
export const Row = styled.div``;
