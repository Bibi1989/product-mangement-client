import React, { useState, useEffect } from "react";
import Moment from "react-moment";
import styled from "styled-components";
import { Container, Logo, ProfilePic } from "./style";
import { Link, useHistory } from "react-router-dom";
import Login from "../UsersComponent/LoginComponent";
import Register from "../UsersComponent/RegisterComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector, useDispatch } from "react-redux";
import { Navbar, NavDropdown, Nav } from "react-bootstrap";
import { Dropdown, Icon, Button } from "semantic-ui-react";
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

    // eslint-disable-next-line
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

  let count =
    notices !== null && notices !== undefined && notices.length.toString();

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
      <NavbarStyle
        bg='light'
        expand='lg'
        style={{ paddingLeft: "1em", paddingRight: "1em" }}
      >
        <Navbar.Brand>
          <Logo>
            {/* <Image>
              <img src={navbar_icon} alt='logo' />
            </Image> */}
            <LText>
              <span>B</span>-MANAGER
            </LText>
          </Logo>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        {token ? (
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              <NavDropdownStyle
                title={
                  <Div>
                    <Icon size='large' name='alarm' color='teal' />
                    <Count>{count}</Count>
                  </Div>
                }
                id='basic-nav-dropdown'
                style={{ marginTop: "2px" }}
              >
                <NavDropdown.Item
                  style={{ padding: "1em", background: "#f1f1f1" }}
                >
                  Actions
                </NavDropdown.Item>
                <NavDropdown.Item
                  style={{
                    minWidth: "250px",
                    maxWidth: "300px",
                    maxHeight: "400px",
                    background: "transparent !important",
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
              </NavDropdownStyle>

              {/* User Profile */}
              <NavDropdown
                title={<Icon name='user' size='large' color='teal' />}
                id='basic-nav-dropdown'
              >
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
      </NavbarStyle>
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
  margin-bottom: 0.5em;
  background-color: white;
  width: 100%;
  padding: 1em;
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
const ClearAllStyle = styled.p`
  padding: 1em;
  background: #f1f1f1;
`;
// const Image = styled.div``;
const LText = styled.p`
  color: teal;

  span {
    color: orangered;
  }
`;
const NavDropdownStyle = styled(NavDropdown)`
  .dropdown-menu {
    background-color: transparent;
    border: none;
  }
  .dropdown-item {
    padding: 0;
    margin: 0;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .dropdown-toggle::after {
    content: ${({ count }) => (count ? count.toString() : "0")};
    display: none;
    margin-left: 0.255em;
    margin-top: 0.255em;
    vertical-align: 0.255em;
    width: 1.4em;
    height: 1.4em;
    font-size: 0.8em;
    color: white;
    background: orangered;
    border-top: 0;
    border-right: 0;
    border-bottom: 0;
    border-left: 0;
    border-radius: 50%;
    /* border-top: 0.3em solid;
    border-right: 0.3em solid transparent;
    border-bottom: 0;
    border-left: 0.3em solid transparent; */
  }
`;
const Div = styled.div`
  position: relative;
  display: flex;
`;
const Count = styled.div`
  position: absolute;
  left: 10px;
  top: -10px;
  background: orangered;
  color: white;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  font-size: 1em;
  text-align: center;
  line-height: 18px;
`;
const NavbarStyle = styled(Navbar)`
  padding: 0.5em 10% !important;

  @media (max-width: 1400px) {
    padding: 0.5em 5% !important;
  }

  @media (max-width: 769px) {
    padding: 0.5em 1em !important;
  }
`;
// const NotifyList = styled.div``
