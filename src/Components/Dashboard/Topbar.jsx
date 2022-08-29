import React from "react";
import logo from "./logo.png";

const Topbar = () => {
  return (
    <div className="hidden dashboard:block">
      <div className="flex h-12 bg-yellow-500  ">
        <div className=" w-48 flex justify-center ">
          <div className="flex justify-center items-center h-12 w-20">
            <img src={logo} alt="Glitch" className="" />
          </div>
        </div>
        <div className=" flex-grow 0"></div>
      </div>
    </div>
  );
};
export default Topbar;
