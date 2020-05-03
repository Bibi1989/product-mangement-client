import React, { useEffect, useState } from "react";
import { useHistory, Link, useLocation } from "react-router-dom";

import {
  Container,
  Row,
  Col,
  Card,
  Project,
  Prob,
  Date,
  Header,
  Menu,
  DropUp,
  Headers,
  Menus,
  DropUps,
} from "./style";
import { Icon, Buttons, Form } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllProjects,
  deleteProject,
  getSingleProject,
} from "../ProjectReducer/store";
import CreateProject, { ModalProject } from "../CreateProject";
import { Button, Badge, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// import { loginUser, registerUser } from "../../UsersComponent/userRedux/store";

const Home = () => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const users = JSON.parse(sessionStorage.getItem("project_user"));
  const history = useHistory();
  const [show, setShow] = useState("");

  const dispatch = useDispatch();
  const location = useLocation();

  // console.log();

  let projects = useSelector(({ project: { projects } }) => projects) || [];
  const count = useSelector(({ project: { count } }) => count);
  const added_project = useSelector(
    ({ project: { added_project } }) => added_project
  );
  const deletes = useSelector(
    ({ project: { deleted_project } }) => deleted_project
  );
  const single = useSelector(({ project: { project } }) => project);

  useEffect(() => {
    fetchAllProjects(dispatch);

    // eslint-disable-next-line
  }, [deletes, count, added_project]);

  if (!token) {
    history.push("/");
  }
  const [shows, setShows] = useState(false);
  const [open, setOpen] = useState(false);

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
      <Row>
        <Col>
          <Card>
            <p>Total Projects</p>
            <div className='total'>
              <Icon name='chart bar' />
              <span>{projects !== undefined && projects.length}</span>
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
          <div className='spinner'>
            {projects.length === 0 && (
              <Spinner animation='border' variant='success' />
            )}
          </div>
          <Project>
            {projects !== undefined &&
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
                  <Link to={`/tasks/${project.id}`}>
                    <p>{project.description}</p>
                  </Link>
                  <Date>
                    <div>
                      <span>Created: {project.start_date} -- </span>
                      <span>Due: {project.end_date}</span>
                    </div>
                    <Menu
                      onClick={() => {
                        setOpen(!open);
                        setShow(project.id);
                      }}
                    >
                      <span></span>
                      <span></span>
                      <span></span>
                      <DropUp className={show === project.id && open && "show"}>
                        <p onClick={() => handleEdit(project.id)}>
                          <Icon name='edit' color='teal' />
                        </p>
                        <p onClick={() => handleDelete(project.id)}>
                          <Icon name='cut' color='orange' />
                        </p>
                      </DropUp>
                    </Menu>
                    {/* <Menus
                      onClick={() => {
                        setShow(project.id);
                        setOpen(!open);
                      }}
                    >
                      <span></span>
                      <span></span>
                      <span></span>
                      <DropUps open={project.id === show && open}>
                        <p onClick={() => setOpen(true)}>
                          <Icon name='edit' color='teal' />
                        </p>
                        <p>
                          <Icon name='cut' color='orange' />
                        </p>
                      </DropUps>
                    </Menus> */}
                  </Date>
                </Prob>
              ))}
            {/* <Menus onClick={() => setOpen(!open)}>
              <span></span>
              <span></span>
              <span></span>
              <DropUps open={open}>
                <p onClick={() => setOpen(true)}>
                  <Icon name='edit' color='teal' />
                </p>
                <p>
                  <Icon name='cut' color='orange' />
                </p>
              </DropUps>
            </Menus> */}
          </Project>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
