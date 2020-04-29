import React from "react";
import { Container, Row, Col, Ul, Li } from "./style";

const Footer = () => {
  return (
    <Container>
      <Row>
        <Col>
          <h2>Contact Me</h2>
          <p>
            <span></span>
            <span>234-816-502-5176</span>
          </p>
          <p>
            <span></span>
            <span>bibiaremieye@gmail.com</span>
          </p>
        </Col>
        <Col>
          <Ul>
            <Li>Term of use</Li>
            <Li>App agreement</Li>
            <Li>Privacy & Cookies</Li>
          </Ul>
        </Col>
        <Col>
          <Ul>
            <Li>Help Center</Li>
            <Li>Contact Us</Li>
            <Li>System Status</Li>
          </Ul>
        </Col>
        <Col>
          <Ul>
            <Li>Help Center</Li>
            <Li>Contact Us</Li>
            <Li>System Status</Li>
          </Ul>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
