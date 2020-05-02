import React, { useState } from "react";
import { Container, Nav, Ul, Li, Logo, User, Buttons } from "./style";
import { Link, useHistory } from "react-router-dom";
import Login from "../UsersComponent/LoginComponent";
import Register from "../UsersComponent/RegisterComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";
import { Loading } from "../UsersComponent/LoginComponent/style";
import { Spinner } from "react-bootstrap";

const NavBar = () => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const user = JSON.parse(sessionStorage.getItem("project_user"));
  const history = useHistory();
  const users = useSelector(({ user: { login_user } }) => login_user);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("project_user");
    history.push("/");
  };

  const [shows, setShows] = useState(false);
  const [showsLogin, setShowsLogin] = useState(false);

  const handleShow = () => setShows(true);
  const handleClose = () => setShows(false);
  const handleShowLogin = () => setShowsLogin(true);
  const handleCloseLogin = () => setShowsLogin(false);

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
        <>
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
              <Buttons
                // variant='success'
                onClick={handleShowLogin}
                style={{
                  marginBottom: "1em",
                  borderRadius: "30px",
                  outline: "none",
                  padding: "0.7em 1.5em",
                  background: "teal",
                  border: "none",
                }}
              >
                Login
              </Buttons>
              <Login show={showsLogin} handleCloseLogin={handleCloseLogin} />
              <Buttons
                // variant='primary'
                onClick={handleShow}
                style={{
                  marginBottom: "1em",
                  borderRadius: "30px",
                  outline: "none",
                  padding: "0.7em 1.5em",
                  background: "orangered",
                  border: "none",
                }}
              >
                Register
              </Buttons>
              <Register show={shows} handleClose={handleClose} />
            </User>
          )}
        </>
      </Nav>
    </Container>
  );
};

export default NavBar;
