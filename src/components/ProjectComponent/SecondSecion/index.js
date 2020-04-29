import React from "react";
import { Container, Row, Col, H1, P, Image } from "./style";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

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
          <Link to='/register'>
            <Button className='started' color='teal'>
              Get Started
            </Button>
          </Link>
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
