import React from "react";
import { Container, Nav, Ul, Li, Logo } from "./style";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const NavBar = () => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const user = JSON.parse(sessionStorage.getItem("project_user"));

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("project_user");
  };
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
        {token ? (
          <Ul className='dash'>
            <Li className='user' onClick={handleLogout}>
              <span>Welcome: </span>
              <span>{user.first_name}</span>
            </Li>
            <Link className='links' to='/login'>
              <Li className='logout' onClick={handleLogout}>
                Logout
              </Li>
            </Link>
          </Ul>
        ) : (
          <Ul>
            <Link className='links' to='/login'>
              <Li className='login'>Login</Li>
            </Link>
            <Link className='links' to='/register'>
              <Li className='register'>Register</Li>
            </Link>
          </Ul>
        )}
      </Nav>
    </Container>
  );
};

export default NavBar;
