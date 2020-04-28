import React from "react";
import { Container, Row, Col, H1, Ul, Li, Image } from "./style";

const HowItWork = () => {
  return (
    <Container>
      <Row>
        <Col>
          <Image>
            <img src='../../../../assets/dev.svg' alt='dev' />
          </Image>
        </Col>
        <Col>
          <H1>How It Works</H1>
          <Ul>
            <Li>Register An Account</Li>
            <Li>Create A Project</Li>
            <Li>Invite A team member</Li>
            <Li>Create tasks</Li>
          </Ul>
        </Col>
      </Row>
    </Container>
  );
};

export default HowItWork;
