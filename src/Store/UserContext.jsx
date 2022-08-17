import React from "react";

const UserContext = React.createContext({
  loggedIn: false,
  setLoggedIn: (loggedIn) => {},
  logout: () => {},
});

export default UserContext;
