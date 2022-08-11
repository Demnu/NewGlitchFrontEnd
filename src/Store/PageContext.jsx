import React from "react";

const PageContext = React.createContext({
  page: "",
  setPage: (page) => {},
});

export default PageContext;
