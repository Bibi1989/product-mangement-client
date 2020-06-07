import React from "react";
import { Tab } from "semantic-ui-react";
import styled from "styled-components";
import Home from "../Home/index";
import ProjectComponent from "../Projects";
import Collaborator from "../Notification/index";
import { Tabs } from "react-bootstrap";
import { useEffect } from "react";
import { setAuth } from "../../Utils/setAuth";
import { useSelector } from "react-redux";

const WelcomePage = () => {
  const [key, setKey] = React.useState("dashboard");
  useEffect(() => {
    if (sessionStorage.token) {
      setAuth(sessionStorage.token);
    }
  }, []);
  const user_verify = useSelector(({ user: { user_verify } }) => user_verify);
  return (
    <Container>
      <Tabs
        id='controlled-tab-example'
        activeKey={key}
        onSelect={(k) => setKey(k)}
      >
        <Tab eventKey='dashboard' title='Dashboard'>
          <Home />
        </Tab>
        <Tab eventKey='projects' title='All Projects'>
          <ProjectComponent />
        </Tab>
        <Tab eventKey='collaborator' title='Collaborating Boards'>
          <Collaborator />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default WelcomePage;

export const Container = styled.div`
  min-height: 50vh;
  width: 100%;
  padding: 3% 10%;
  background: #f9fbfc !important;

  @media (max-width: 1200px) {
    padding: 3% 5%;
  }
  @media (max-width: 769px) {
    padding: 3% 0;
  }

  .grid {
    width: 99%;
  }

  .item {
    padding: 1.4em !important;
  }
  a.active {
    background: #f9fbfc !important;
    color: #555555 !important;
  }
`;

export const Div = styled.div``;
