import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useReducer, useSelector } from "react-redux";
const ProtectedRoute = (props) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  return userInfo ? <Route {...props} /> : <Redirect to="/login" />;
};

export default ProtectedRoute;
