import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Button, Spinner } from "react-bootstrap";
import {
  acceptInvite,
  deleteInvite,
  getInvites,
} from "../ProjectReducer/store";

const Invite = () => {
  const dispatch = useDispatch();
  let invites = useSelector(({ project: { invites } }) => invites);

  React.useEffect(() => {
    getInvites(dispatch);

    // eslint-disable-next-line
  }, []);

  return (
    <Container>
      <Row>
        <h1>Invites</h1>
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
