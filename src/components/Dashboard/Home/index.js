import React, { useEffect, useState } from "react";
import { useHistory, Link, useLocation } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Project,
  Prob,
  Date,
  Header,
  Headers,
  Welcome,
} from "./style";
import { Icon, Form } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllProjects,
  deleteProject,
  getSingleProject,
  getInvites,
  acceptInvite,
  deleteInvite,
} from "../ProjectReducer/store";
import CreateProject from "../CreateProject";
import { Button, Badge, Spinner, Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const users = JSON.parse(sessionStorage.getItem("project_user"));
  const history = useHistory();
  const [show, setShow] = useState("");

  const dispatch = useDispatch();

  let invites = useSelector(({ project: { invites } }) => invites);
  let projects = useSelector(({ project: { projects } }) => projects) || [];
  const count = useSelector(({ project: { count } }) => count);
  const added_project = useSelector(
    ({ project: { added_project } }) => added_project
  );
  const loading = useSelector(({ project: { loading } }) => loading);
  const deletes = useSelector(
    ({ project: { deleted_project } }) => deleted_project
  );
  const single = useSelector(({ project: { project } }) => project);

  useEffect(() => {
    fetchAllProjects(dispatch);
    getInvites(dispatch);

    // eslint-disable-next-line
  }, [deletes, count, added_project]);

  if (!token) {
    history.push("/");
  }
  const [shows, setShows] = useState(false);
  // const [open, setOpen] = useState(false);

  const [search, setSearch] = useState("");

  const handleSearch = ({ target: { value } }) => {
    setSearch(value);
  };

  projects =
    (projects !== null &&
      projects.filter((project) =>
        project.project_name.toLowerCase().includes(search.toLowerCase())
      )) ||
    null;

  const handleDelete = (id) => {
    deleteProject(dispatch, id, history);
    setShow("");
  };
  const handleEdit = (id) => {
    getSingleProject(dispatch, id);
    setShow("");
    setShows(true);
    // history.push("/dashboard");
  };

  const handleShow = () => setShows(true);
  const handleClose = () => setShows(false);

  return (
    <Container>
      <Welcome>
        <h2>Welcome: </h2>
        <p>
          {users.first_name} {users.last_name}
        </p>
      </Welcome>
      {invites !== null &&
        invites.map((invite) => {
          return (
            <div>
              <p>{invite.sender} invite you to collaborate</p>
              <Button variant='danger'>Decline</Button>
              <Button
                variant='success'
                onClick={() => {
                  acceptInvite(dispatch, invite.ProjectId);
                  deleteInvite(dispatch, invite.id);
                }}
              >
                Accept
              </Button>
            </div>
          );
        })}
      <Row>
        <Col>
          <Card>
            <p>Total Projects</p>
            <div className='total'>
              <Icon name='chart bar' />
              <span>
                {loading ? (
                  <Spinner animation='grow' variant='success' />
                ) : (
                  projects.length
                )}
              </span>
            </div>
          </Card>
          <Card>
            <p>Total Tasks</p>
            <div className='total'>
              <Icon name='chart line' />
              <span>{count}</span>
            </div>
          </Card>
          <Card>
            <p>Total Likes</p>
            <div className='total'>
              <Icon name='chart pie' />
              <span>3</span>
            </div>
          </Card>
        </Col>
        <Col>
          <Headers>
            <Button variant='primary' onClick={handleShow}>
              <Icon name='plus' /> Create Project
            </Button>
            <Form style={{ width: "30%" }}>
              <Form.Field>
                <input
                  placeholder='Search for projects...'
                  onChange={handleSearch}
                />
              </Form.Field>
            </Form>
          </Headers>
          <CreateProject
            show={shows}
            handleClose={handleClose}
            single={single}
          />
        </Col>
        <Col>
          {projects.length === 0 && (
            <p style={{ textAlign: "center" }}>
              You Have no project create one!!!
            </p>
          )}
          <Project>
            {loading ? (
              <div className='spinner'>
                {loading && <Spinner animation='border' variant='success' />}
              </div>
            ) : (
              projects.map((project) => (
                <Prob key={project.id}>
                  <Header>
                    <h1>{project.project_name}</h1>
                    <Badge
                      className='primary'
                      pill
                      variant={
                        project.project_identifier === "public"
                          ? "info"
                          : "primary"
                      }
                    >
                      {project.project_identifier}
                    </Badge>
                  </Header>
                  <Link className='link' to={`/tasks/${project.id}`}>
                    <p>{project.description}</p>
                  </Link>
                  <Date>
                    <div>
                      <span>Created: {project.start_date} -- </span>
                      <span>Due: {project.end_date}</span>
                    </div>
                    <Dropdown>
                      <Dropdown.Toggle
                        variant='info'
                        id='dropdown-basic'
                      ></Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item href='#/action-1'>
                          <p onClick={() => handleEdit(project.id)}>
                            <Icon name='edit' color='teal' /> Edit
                          </p>
                        </Dropdown.Item>
                        <Dropdown.Item href='#/action-2'>
                          <p onClick={() => handleDelete(project.id)}>
                            <Icon name='cut' color='orange' /> Delete
                          </p>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Date>
                </Prob>
              ))
            )}
          </Project>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
