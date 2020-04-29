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
} from "../Home/style";
import { Icon, Button } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllProjects,
  getSingleProject,
  getSingleTask,
  deleteProject,
} from "../ProjectReducer/store";

const ProjectComponent = () => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const history = useHistory();
  const [show, setShow] = useState("");

  const dispatch = useDispatch();

  const projects = useSelector(({ project: { projects } }) => projects);
  const deletes = useSelector(
    ({ project: { deleted_project } }) => deleted_project
  );

  useEffect(() => {
    fetchAllProjects(dispatch);

    // eslint-disable-next-line
  }, [deletes]);

  if (!token) {
    history.push("/login");
  }

  const handleDelete = (id) => {
    deleteProject(dispatch, id, history);
    setShow("");
  };
  const handleEdit = (id) => {
    getSingleProject(dispatch, id);
    setShow("");
    history.push("/create");
  };

  const onTask = (id) => {
    getSingleTask(dispatch, id, history);
  };

  return (
    <Container>
      <Row>
        <Col>
          <Link to='/create'>
            <Button className='btn'>
              <Icon name='plus' />
              Create Project
            </Button>
          </Link>
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
                  <p onClick={() => onTask(project.id)}>
                    {project.description}
                  </p>
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
