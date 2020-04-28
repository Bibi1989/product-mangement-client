import React from "react";
import { Container, Nav, Ul, Li } from "./style";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <Container>
      <Nav>
        <Ul>
          <Link className='links' to='login'>
            <Li className='login'>Login</Li>
          </Link>
          <Link className='links' to='register'>
            <Li className='register'>Register</Li>
          </Link>
        </Ul>
      </Nav>
    </Container>
  );
};

export default NavBar;
