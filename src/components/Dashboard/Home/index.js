import React, { useEffect, useState, memo } from "react";
import { useHistory, Link } from "react-router-dom";
import { Container, Row, Col, Card, Project, Headers, Welcome } from "./style";
import { Icon, Form, Label } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllProjects,
  deleteProject,
  getInvites,
  getCurrent,
} from "../ProjectReducer/store";
import CreateProject from "../CreateProject";
import { Button, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Props from "./Props";

const Home = () => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const users = JSON.parse(sessionStorage.getItem("project_user"));
  const history = useHistory();
  const [_, setShow] = useState("");

  const dispatch = useDispatch();

  let invites = useSelector(({ project: { invites } }) => invites);
  let notify = useSelector(({ project: { notify } }) => notify);
  let projects = useSelector(({ project: { projects } }) => projects) || [];
  const count = useSelector(({ project: { count } }) => count);
  const added_project = useSelector(
    ({ project: { added_project } }) => added_project
  );
  const updated_project = useSelector(
    ({ project: { updated_project } }) => updated_project
  );
  const loading = useSelector(({ project: { loading } }) => loading);
  // const load = useSelector(({ user: { loading } }) => loading);
  const deletes = useSelector(
    ({ project: { deleted_project } }) => deleted_project
  );
  const single = useSelector(({ project: { project } }) => project);

  useEffect(() => {
    fetchAllProjects(dispatch);
    getInvites(dispatch);

    // eslint-disable-next-line
  }, [deletes, count, added_project, notify, updated_project]);

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
  const handleEdit = (project) => {
    getCurrent(dispatch, project);
    setShow("");
    setShows(true);
  };

  const handleShow = () => setShows(true);
  const handleClose = () => setShows(false);

  if (!projects) {
    return (
      <div className='spinner'>
        {loading && <Spinner animation='border' variant='success' />}
      </div>
    );
  }

  return (
    <Container>
      <Welcome>
        <h2>Welcome: </h2>
        <p>
          {users.first_name} {users.last_name}
        </p>
      </Welcome>

      {invites !== null && invites.length > 0 && (
        <p style={{ color: "teal" }}>
          Some one sent You an Invite{" "}
          <Link to='/invite'>
            <Label>View Invites</Label>
          </Link>
        </p>
      )}
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
            {/* {loading ? ( */}
            {/* <div className='spinner'>
                {loading && <Spinner animation='border' variant='success' />}
              </div> */}
            {projects.map((project) => (
              <Props
                key={project.id}
                project={project}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            ))}
          </Project>
        </Col>
      </Row>
    </Container>
  );
};

export default memo(Home);
