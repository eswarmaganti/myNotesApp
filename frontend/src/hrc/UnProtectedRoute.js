import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
const UnProtectedRoute = (props) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  return !userInfo ? <Route {...props} /> : <Redirect to="/app/dashboard" />;
};

export default UnProtectedRoute;
