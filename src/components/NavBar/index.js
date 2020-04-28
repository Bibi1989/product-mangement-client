import React from "react";
import { Container, Nav, Ul, Li, Logo } from "./style";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <Container>
      <Nav>
        <Logo>
          <div className='img'>
            <img src='../../../assets/pyramid3.svg' alt='logo' />
          </div>
          <h3>
            <span>B</span>-MANAGER
          </h3>
        </Logo>
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
