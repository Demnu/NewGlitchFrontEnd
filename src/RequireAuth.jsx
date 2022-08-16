import React, { useContext } from "react";
import { useLocation, Navigate } from "react-router-dom";
import UserContext from "./Store/UserContext";
const RequireAuth = ({ children }) => {
  const userCtx = useContext(UserContext);
  let location = useLocation();
  if (!userCtx.loggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default RequireAuth;
