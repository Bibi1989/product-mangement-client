import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import styled from "styled-components";

import Login from "./components/UsersComponent/LoginComponent/index";
import "./App.css";
import Nav from "./components/NavBar/index";
import Register from "./components/UsersComponent/RegisterComponent/index";
import FirstSection from "./components/ProjectComponent/FirstSection";
import SecondSection from "./components/ProjectComponent/SecondSecion";

function App() {
  return (
    <BrowserRouter>
      <Wrapper>
        <Nav />
        <Switch>
          <Route exact path='/'>
            <FirstSection />
            <SecondSection />
          </Route>
          <Route exact path='/login'>
            <Login />
          </Route>
          <Route exact path='/register'>
            <Register />
          </Route>
        </Switch>
      </Wrapper>
    </BrowserRouter>
  );
}

const Wrapper = styled.div`
  position: relative;
`;

export default App;
