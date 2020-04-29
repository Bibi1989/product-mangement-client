import React from "react";
import { Container, Nav, Ul, Li, Logo, User } from "./style";
import { Link, useHistory } from "react-router-dom";
import Login from "../UsersComponent/LoginComponent";
import Register from "../UsersComponent/RegisterComponent";

const NavBar = () => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const user = JSON.parse(sessionStorage.getItem("project_user"));
  const history = useHistory();

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("project_user");
    history.push("/");
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
            <Link className='links' to='/'>
              <Li className='logout' onClick={handleLogout}>
                Logout
              </Li>
            </Link>
          </Ul>
        ) : (
          <User>
            <Login />
            <Register />
          </User>
        )}
      </Nav>
    </Container>
  );
};

export default NavBar;
