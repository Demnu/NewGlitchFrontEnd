import React, { useContext, useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { authenticate } from "./myApi";
import UserContext from "./Store/UserContext";
const RequireAuth = ({ children }) => {
  const userCtx = useContext(UserContext);
  let location = useLocation();

  // useEffect(() => {
  //   if (location.pathname != "/login") {
  //     const response = authenticate();
  //     response.then(() => {
  //       userCtx.setLoggedIn(true);
  //     });
  //     response.catch(() => {
  //       userCtx.logout();
  //     });
  //   }
  // }, [location]);

  if (!userCtx.loggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default RequireAuth;
