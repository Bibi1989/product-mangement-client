import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const token = JSON.parse(sessionStorage.getItem("token"));

const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = useSelector(({ user: { user_verify } }) => user_verify);
  return (
    <Route
      {...rest}
      render={(props) =>
        token ? <Component {...props} user={user} /> : <Redirect to='/' />
      }
    />
  );
};

export default PrivateRoute;
