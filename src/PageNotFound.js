import React from "react";
import { useHistory } from "react-router-dom";

const PageNotFound = () => {
  const history = useHistory();
  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Sorry!!! This page is not found</h2>
      <p
        style={{ textAlign: "center", color: "green", cursor: "pointer" }}
        onClick={() => history.push("/")}
      >
        Click Me to Go Back Home
      </p>
    </div>
  );
};

export default PageNotFound;
