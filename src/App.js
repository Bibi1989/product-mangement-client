import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import { Provider } from "react-redux";

import Login from "./components/UsersComponent/LoginComponent/index";
import Nav from "./components/NavBar/index";
import Register from "./components/UsersComponent/RegisterComponent/index";
import FirstSection from "./components/ProjectComponent/FirstSection";
import SecondSection from "./components/ProjectComponent/SecondSecion";
import HowItWork from "./components/ProjectComponent/HowItWork";
import Slider from "./components/Utils/Slider";
import store from "./redux/store";

import "swiper/css/swiper.css";
import "./App.css";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Wrapper>
          <Nav />
          <Switch>
            <Route exact path='/'>
              <FirstSection />
              <SecondSection />
              <HowItWork />
              <Slider />
            </Route>
            <Route exact path='/login'>
              <Login />
            </Route>
            <Route exact path='/register'>
              <Register />
            </Route>
          </Switch>
          <Footer />
        </Wrapper>
      </Provider>
    </BrowserRouter>
  );
}

const Wrapper = styled.div`
  position: relative;
`;

export default App;
