import React from "react";

const UserContext = React.createContext({
  loggedIn: false,
  setLoggedIn: (loggedIn) => {},
});

export default UserContext;
