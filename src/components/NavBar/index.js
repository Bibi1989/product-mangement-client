import React, { useState, useEffect } from "react";
import { format, parseISO } from "date-fns";
import Moment from "react-moment";
import {
  Container,
  Nav,
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
import { Popover, OverlayTrigger } from "react-bootstrap";
import { Dropdown } from "semantic-ui-react";
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

  const popover = (
    <Popover id='popover-basic'>
      <ProfilePic>
        <h2 className='avatar'>
          {user !== null &&
            user.first_name[0].toUpperCase() + user.last_name[0].toUpperCase()}
        </h2>
        <div className='profile_contact'>
          <p>
            {user !== null && user.first_name} {user !== null && user.last_name}
          </p>
          <p>{user !== null && user.email}</p>
          <p>{user !== null && user.phone}</p>
        </div>
      </ProfilePic>
      <Popover.Content>
        <Link to='/profile'>
          <p>View Your Profile</p>
        </Link>
      </Popover.Content>
    </Popover>
  );

  return (
    <Container>
      <Nav
        style={{
          position: "relative",
        }}
      >
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
              <div style={{ position: "relative" }}>
                <Dropdown icon='alarm' floating labeled className='icon'>
                  <Dropdown.Menu
                    className='notice'
                    style={{
                      // marginLeft: "-220%",
                      position: "absolute",
                      maxHeight: "400px",
                      overflow: "auto",
                    }}
                  >
                    <Dropdown.Header content='Your Notifications' />
                    {notices !== null &&
                      notices !== undefined &&
                      notices.map((notice) => {
                        return (
                          <Dropdown.Item
                            key={notice.id}
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "flex-start",
                              }}
                            >
                              <p
                                style={{
                                  fontSize: "1em",
                                  color: "#333",
                                  padding: "0",
                                }}
                              >
                                {notice.notify}
                              </p>
                              <span
                                style={{
                                  fontSize: "0.8em",
                                  color: "#999",
                                  padding: "0",
                                }}
                              >
                                <Moment fromNow>{notice.createdAt}</Moment>
                              </span>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "flex-end",
                              }}
                            >
                              <p
                                style={{
                                  fontSize: "1.4em",
                                }}
                                onClick={() => handleNotifyDelete(notice.id)}
                              >
                                &times;{" "}
                              </p>
                            </div>
                          </Dropdown.Item>
                        );
                      })}
                    <Dropdown.Item>
                      <p onClick={() => deleteAllNotification(dispatch)}>
                        Clear all notifications
                      </p>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <p
                  style={{
                    position: "absolute",
                    right: "5px",
                    top: "-3px",
                    width: "18px",
                    height: "18px",
                    borderRadius: "50%",
                    background: "orangered",
                    color: "white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {notices !== null && notices !== undefined && notices.length}
                </p>
              </div>

              <Li className='user'>
                <Dropdown icon='user' floating labeled className='icon'>
                  <Dropdown.Menu
                    style={{
                      marginLeft: "-500%",
                      // width: "220px",
                      position: "absolute",
                      right: "30%",
                      maxHeight: "400px",
                      overflow: "auto",
                    }}
                  >
                    <Dropdown.Header
                      content='Your Profile'
                      styled={{ borderBottom: "1px solid #cccccc" }}
                    />
                    <Dropdown.Item
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
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
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Link style={{ color: "#999999" }} to='/profile'>
                        <p
                          style={{
                            padding: "1em 0",
                            borderBottom: "1px solid #aaaaaa",
                            borderTop: "1px solid #aaaaaa",
                          }}
                        >
                          View Your Profile
                        </p>
                      </Link>
                      <Link style={{ color: "#999999" }} to='/invite'>
                        <p
                          style={{
                            padding: "1em 0",
                          }}
                        >
                          View Invites
                        </p>
                      </Link>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                {/* <OverlayTrigger
                  trigger='click'
                  placement='bottom'
                  overlay={popover}
                >
                  <h2>
                    {user.first_name[0].toUpperCase() +
                      user.last_name[0].toUpperCase()}
                  </h2>
                </OverlayTrigger> */}
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
                  color: "#ffffff",
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
                  color: "#ffffff",
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
