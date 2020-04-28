import React from "react";
import { Container, Row, Col, H1, H2, P, Image } from "./style";
import { Button } from "semantic-ui-react";

const SecondSection = () => {
  return (
    <Container>
      <Row>
        <Col>
          <H1>Manage Project</H1>
          <P>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, a
            dolorum! Ex unde ratione, quidem incidunt porro quibusdam illo
            natus, provident nulla quod aspernatur. Vero inventore odit
            cupiditate libero porro.
          </P>
          <Button className='started' color='teal'>
            Get Started
          </Button>
        </Col>
        <Col>
          <Image>
            <img src='../../../../assets/product.svg' alt='product svg' />
          </Image>
        </Col>
      </Row>
    </Container>
  );
};

export default SecondSection;
