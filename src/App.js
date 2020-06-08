import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import "antd/dist/antd.css";
import Nav from "./components/NavBar/index";

import store from "./redux/store";

import "swiper/css/swiper.css";
import "./App.css";
import Footer from "./components/Footer";
import WelcomePage from "./components/Dashboard/WelcomePage";
import LandingPage from "./components/ProjectComponent/LandingPage";
import CreateProject from "./components/Dashboard/CreateProject/index";
import PageNotFound from "./PageNotFound";
import NewTaskCards from "./components/Dashboard/Tasks/NewTaskCards";
import Profile from "./components/Dashboard/ProfileView";
import Invite from "./components/Dashboard/Invites/Invite";
import PrivateRoute from "./privateRoute/PrivateRoute";

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
              <PrivateRoute exact path='/dashboard' component={WelcomePage} />
              <Route exact path='/create'>
                <CreateProject />
              </Route>
              <Route exact path='/tasks/:projectId'>
                <NewTaskCards />
              </Route>
              <Route exact path='/profile'>
                <Profile />
              </Route>
              <Route exact path='/invite'>
                <Invite />
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
