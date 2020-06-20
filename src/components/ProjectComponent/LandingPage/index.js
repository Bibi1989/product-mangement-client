import React from "react";
import { useHistory } from "react-router-dom";

import FirstSection from "../FirstSection";
import SecondSection from "../SecondSecion";
import HowItWork from "../HowItWork";
import SlidingComponent from "../SlidingComponent";

const LandingPage = () => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const history = useHistory();
  if (token) {
    history.push("/dashboard");
  }
  return (
    <div>
      <FirstSection />
      <SecondSection />
      <HowItWork />
      <SlidingComponent />
    </div>
  );
};

export default LandingPage;
