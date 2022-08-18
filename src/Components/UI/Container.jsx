import React from "react";

const Container = ({ children }) => {
  return (
    <div
      className={` mx-auto  my-5 max-w-sm overflow-hidden  rounded-lg bg-zinc-800 px-3 py-3 text-white shadow-lg`}
    >
      {children}
    </div>
  );
};
export default Container;
