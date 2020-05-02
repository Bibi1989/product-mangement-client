import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";

import {
  Container,
  Row,
  Col,
  Project,
  Prob,
  Date,
  Header,
  Menu,
  DropUp,
  Headers,
} from "../Home/style";
import { Icon, Button, Form } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllProjects,
  getSingleProject,
  deleteProject,
} from "../ProjectReducer/store";
import CreateProject from "../CreateProject";

const ProjectComponent = () => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const history = useHistory();
  const [show, setShow] = useState("");

  const dispatch = useDispatch();

  let projects = useSelector(({ project: { projects } }) => projects);
  const added_project = useSelector(
    ({ project: { added_project } }) => added_project
  );
  const deletes = useSelector(
    ({ project: { deleted_project } }) => deleted_project
  );

  useEffect(() => {
    fetchAllProjects(dispatch);

    // eslint-disable-next-line
  }, [deletes, added_project]);

  if (!token) {
    history.push("/");
  }

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
    history.push("/create");
  };
  const [shows, setShows] = useState(false);

  const handleShow = () => setShows(true);
  const handleClose = () => setShows(false);

  return (
    <Container>
      <Row>
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
          <CreateProject show={shows} handleClose={handleClose} />
        </Col>
        <Col>
          {/* {projects.length !== undefined && (
            <p>You Have no project create one!!!</p>
          )} */}
          <Project>
            {projects !== undefined &&
              projects.map((project) => (
                <Prob key={project.id}>
                  <Header>
                    <h1>{project.project_name}</h1>
                    <p
                      className={
                        project.project_identifier === "public"
                          ? "public"
                          : "private"
                      }
                    >
                      {project.project_identifier}
                    </p>
                  </Header>
                  <Link to={`/tasks/${project.id}`}>
                    <p>{project.description}</p>
                  </Link>
                  <Date>
                    <div>
                      <span>Created: {project.start_date} -- </span>
                      <span>Due: {project.end_date}</span>
                    </div>
                    <Menu onClick={() => setShow(project.id)}>
                      <span></span>
                      <span></span>
                      <span></span>
                      <DropUp className={show === project.id && "show"}>
                        <p onClick={() => handleEdit(project.id)}>
                          <Icon name='edit' color='teal' />
                        </p>
                        <p onClick={() => handleDelete(project.id)}>
                          <Icon name='cut' color='orange' />
                        </p>
                      </DropUp>
                    </Menu>
                  </Date>
                </Prob>
              ))}
          </Project>
        </Col>
      </Row>
    </Container>
  );
};

export default ProjectComponent;
