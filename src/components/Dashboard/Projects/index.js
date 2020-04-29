import React, { useEffect } from "react";
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
} from "../Home/style";
import { Icon, Button } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProjects } from "../ProjectReducer/store";

const ProjectComponent = () => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const history = useHistory();

  const dispatch = useDispatch();

  const projects = useSelector(({ project: { projects } }) => projects);
  // let noOfTasks = 0;
  // projects !== undefined &&
  //   projects.forEach((project) => {
  //     noOfTasks += project.Tasks.length;
  //   });

  console.log(projects);

  if (!token) {
    history.push("/login");
  }

  useEffect(() => {
    fetchAllProjects(dispatch);
  }, []);
  return (
    <Container>
      <Row>
        {/* <Col>
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
        </Col> */}
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
            {projects !== undefined &&
              projects.map((array) => (
                <Prob key={array.id}>
                  <Header>
                    <h1>{array.project_name}</h1>
                    <p
                      className={
                        array.project_identifier === "public"
                          ? "public"
                          : "private"
                      }
                    >
                      {array.project_identifier}
                    </p>
                  </Header>
                  <p>{array.description}</p>
                  <Date>
                    <span>Created: {array.start_date} -- </span>
                    <span>Due: {array.end_date}</span>
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
