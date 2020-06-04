import React, { useState, useEffect } from "react";
import { format, parseISO } from "date-fns";
import Moment from "react-moment";
import styled from "styled-components";
import {
  Container,
  Navs,
  Ul,
  Li,
  Logo,
  User,
  Buttons,
  ProfilePic,
} from "./style";
import { Link, useHistory } from "react-router-dom";
import Login from "../UsersComponent/LoginComponent";
import Register from "../UsersComponent/RegisterComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector, useDispatch } from "react-redux";
import {
  Popover,
  OverlayTrigger,
  Navbar,
  NavDropdown,
  Nav,
} from "react-bootstrap";
import { Dropdown, Icon, Label, Button } from "semantic-ui-react";
import {
  deleteNotification,
  getNotifications,
  deleteAllNotification,
} from "../Dashboard/ProjectReducer/store";

const NavBar = () => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const user = JSON.parse(sessionStorage.getItem("project_user")) || null;
  const history = useHistory();
  const dispatch = useDispatch();
  const notices = useSelector(({ project: { notify } }) => notify);
  const delete_notify = useSelector(
    ({ project: { delete_notify } }) => delete_notify
  );

  const [change, setChange] = useState(false);

  useEffect(() => {
    getNotifications(dispatch);
  }, [delete_notify, change]);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("project_user");
    history.push("/");
  };

  const [shows, setShows] = useState(false);
  const [showsLogin, setShowsLogin] = useState(false);

  const handleShow = () => setShows(true);
  const handleClose = (setValuesRegister) => {
    setValuesRegister({
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      password: "",
    });
    setShows(false);
  };
  const handleShowLogin = () => setShowsLogin(true);
  const handleCloseLogin = (setValues) => {
    setValues({
      email: "",
      password: "",
    });
    setShowsLogin(false);
  };

  const handleNotifyDelete = (id) => {
    setChange(!change);
    deleteNotification(dispatch, id);
  };

  return (
    <Container>
      <Navbar bg='light' expand='lg'>
        <Navbar.Brand>
          <Logo>
            <Image>
              <img src='../../../assets/pyramid3.svg' alt='logo' />
            </Image>
            <LText>
              <span>B</span>-MANAGER
            </LText>
          </Logo>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        {token ? (
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              <Nav.Link>Home</Nav.Link>
              <Nav.Link>Link</Nav.Link>
              <NavDropdown
                title={<Icon name='alarm' />}
                id='basic-nav-dropdown'
              >
                <NavDropdown.Item>Actions</NavDropdown.Item>
                <NavDropdown.Item
                  style={{
                    minWidth: "250px",
                    maxWidth: "300px",
                    overflow: "auto",
                  }}
                >
                  {notices !== null &&
                    notices !== undefined &&
                    notices.map((notice) => {
                      return (
                        <ItemStyle key={notice.id}>
                          <NotifyList>
                            <PText>{notice.notify}</PText>
                            <DateStyle>
                              <Moment fromNow>{notice.createdAt}</Moment>
                            </DateStyle>
                          </NotifyList>
                          <RemoveTag>
                            <PRemove
                              onClick={() => handleNotifyDelete(notice.id)}
                            >
                              &times;{" "}
                            </PRemove>
                          </RemoveTag>
                        </ItemStyle>
                      );
                    })}
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>
                  <ClearAllStyle
                    onClick={() => deleteAllNotification(dispatch)}
                  >
                    Clear all notifications
                  </ClearAllStyle>
                </NavDropdown.Item>
              </NavDropdown>

              {/* User Profile */}
              <NavDropdown title={<Icon name='user' />} id='basic-nav-dropdown'>
                <NavDropdown.Item>Action</NavDropdown.Item>
                <NavDropdown.Item>
                  <ProfilePic>
                    <h2 className='avatar'>
                      {user !== null &&
                        user.first_name[0].toUpperCase() +
                          user.last_name[0].toUpperCase()}
                    </h2>
                    <div className='profile_contact'>
                      <p>
                        {user !== null && user.first_name}{" "}
                        {user !== null && user.last_name}
                      </p>
                      <p>{user !== null && user.email}</p>
                      <p>{user !== null && user.phone}</p>
                    </div>
                  </ProfilePic>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link style={{ color: "#999999" }} to='/profile'>
                    <p
                      style={{
                        padding: "1em 0",
                      }}
                    >
                      View Your Profile
                    </p>
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>
                  <Link style={{ color: "#999999" }} to='/invite'>
                    <p
                      style={{
                        padding: "1em 0",
                      }}
                    >
                      View Invites
                    </p>
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown.Item>
                <Button color='youtube' onClick={handleLogout}>
                  Logout
                </Button>
              </NavDropdown.Item>
            </Nav>
          </Navbar.Collapse>
        ) : (
          <Navbar.Collapse>
            <Nav className='ml-auto'>
              <NavDropdown.Item>
                <Button color='teal' onClick={handleShowLogin}>
                  Login
                </Button>
                <Login show={showsLogin} handleCloseLogin={handleCloseLogin} />
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Button color='orange' onClick={handleShow}>
                  Register
                </Button>
                <Register show={shows} handleClose={handleClose} />
              </NavDropdown.Item>
            </Nav>
          </Navbar.Collapse>
        )}
      </Navbar>
    </Container>
  );
};

export default NavBar;

const NotifyList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;
const ItemStyle = styled(Dropdown.Item)`
  display: flex;
  justify-content: space-between;
`;
const PText = styled.p`
  font-size: 1em;
  color: #333;
  padding: 0;
`;
const DateStyle = styled.span`
  font-size: 0.8em;
  color: #999999;
  padding: 0;
`;
const RemoveTag = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
`;
const PRemove = styled.p`
  font-size: 1.4em;
  padding: 0;
`;
const ClearAllStyle = styled.p``;
const Image = styled.div``;
const LText = styled.p`
  color: teal;

  span {
    color: orangered;
  }
`;
// const NotifyList = styled.div``
