import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";

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
} from "./style";
import { Icon, Button } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllProjects,
  deleteProject,
  getSingleProject,
} from "../ProjectReducer/store";

const Home = () => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const history = useHistory();
  const [show, setShow] = useState("");
  const [single, setSingle] = useState();

  const dispatch = useDispatch();

  const projects = useSelector(({ project: { projects } }) => projects);
  const deletes = useSelector(
    ({ project: { deleted_project } }) => deleted_project
  );

  useEffect(() => {
    fetchAllProjects(dispatch);
  }, [deletes]);
  // let noOfTasks = 0;
  // projects !== undefined &&
  //   projects.forEach((project) => {
  //     noOfTasks += project.Tasks.length;
  //   });

  console.log(deletes);

  if (!token) {
    history.push("/login");
  }

  const handleDelete = (id) => {
    deleteProject(dispatch, id, history);
    setShow("");
  };
  const handleEdit = (id) => {
    const getSingle = getSingleProject(dispatch, id);
    setShow("");
    setSingle(getSingle);
    history.push("/create");
  };

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
              <span>{0}</span>
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
          <Link to='/create'>
            <Button className='btn'>
              <Icon name='plus' />
              Create Project
            </Button>
          </Link>
        </Col>
        <Col>
          {projects.length <= 0 && <p>You Have no project create one!!!</p>}
          <Project>
            {projects.length >= 0 &&
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
                  <p>{project.description}</p>
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

export default Home;
