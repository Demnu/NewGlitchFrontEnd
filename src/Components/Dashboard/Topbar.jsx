import React from "react";
import logo from "./logo.png";

const Topbar = () => {
  return (
    <div className="hidden dashboard:block">
      <div className="flex h-12 bg-yellow-500  ">
        <div className=" w-48   ">
          <div className="flex justify-center h-12">
            <img src={logo} alt="Glitch" className="" />
          </div>
        </div>
        <div className=" flex-grow 0"></div>
      </div>
    </div>
  );
};
export default Topbar;
