import React from "react";

const Container = ({ children }) => {
  return (
    <div
      className={` bg-zinc-800  max-w-sm mx-auto my-5  rounded-lg overflow-hidden shadow-lg px-3 py-3 text-white`}
    >
      {children}
    </div>
  );
};
export default Container;
