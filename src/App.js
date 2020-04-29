import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import { Provider } from "react-redux";

import Login from "./components/UsersComponent/LoginComponent/index";
import Nav from "./components/NavBar/index";
import Register from "./components/UsersComponent/RegisterComponent/index";

import store from "./redux/store";

import "swiper/css/swiper.css";
import "./App.css";
import Footer from "./components/Footer";
import WelcomePage from "./components/Dashboard/WelcomePage";
import LandingPage from "./components/ProjectComponent/LandingPage";
import CreateProject from "./components/Dashboard/CreateProject/index";
import PageNotFound from "./PageNotFound";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Wrapper>
          <Nav />
          <div>
            <Switch>
              <Route exact path='/'>
                <LandingPage />
              </Route>
              <Route exact path='/login'>
                <Login />
              </Route>
              <Route exact path='/register'>
                <Register />
              </Route>
              <Route exact path='/dashboard'>
                <WelcomePage />
              </Route>
              <Route exact path='/create'>
                <CreateProject />
              </Route>
              <Route exact to='/notfound'>
                <PageNotFound />
              </Route>
            </Switch>
          </div>
          <Footer />
        </Wrapper>
      </Provider>
    </BrowserRouter>
  );
}

const Wrapper = styled.div`
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export default App;
