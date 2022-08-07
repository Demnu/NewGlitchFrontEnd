import React from "react";
import logo from "./logo.png";
const Topbar = () => {
  return (
    <div className="flex h-11 ">
      <div className=" w-48  bg-yellow-500 ">
        <div className="flex justify-center h-11">
          <img src={logo} alt="Glitch" className=" w-4/12" />
        </div>
      </div>
      <div className=" flex-grow bg-yellow-500"></div>
    </div>
  );
};
export default Topbar;
