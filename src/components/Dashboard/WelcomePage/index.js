import React from "react";
import { Tab } from "semantic-ui-react";
import styled from "styled-components";
import Home from "../Home/index";
import ProjectComponent from "../Projects";

const panes = [
  {
    menuItem: "Create Project",
    render: () => (
      <Div>
        <Home />
      </Div>
    ),
  },
  {
    menuItem: "All Projects",
    render: () => (
      <Tab.Pane>
        <ProjectComponent />
      </Tab.Pane>
    ),
  },
  { menuItem: "Tab 3", render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
];

const WelcomePage = () => {
  return (
    <Container>
      <Tab
        menu={{ fluid: true, vertical: true, tabular: true }}
        panes={panes}
      />
      {/* <div>
        <div className='ui grid'>
          <div className='four wide column'>
            <div className='ui fluid vertical tabular menu'>
              <a className='active item'>Tab 1</a>
              <a className='item'>Tab 2</a>
              <a className='item'>Tab 3</a>
            </div>
          </div>
          <div className='stretched twelve wide column'>
            <div className='ui bottom attached segment active tab'>
              Tab 1 Content
            </div>
          </div>
        </div>
      </div> */}
    </Container>
  );
};

export default WelcomePage;

export const Container = styled.div`
  min-height: 50vh;

  .item {
    padding: 1.4em !important;
  }
  a.active {
    background: #f9fbfc !important;
    color: #555555 !important;
  }
`;

export const Div = styled.div``;
