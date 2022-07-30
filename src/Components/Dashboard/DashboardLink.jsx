import React from "react";
const DashBoardLink = ({ selected, title, icon: Icon }) => {
  return (
    <li
      className={`${selected === true ? "bg-yellow-400" : "bg-yellow-500"} ${
        selected === false && "hover:bg-yellow-600"
      } text-xl  py-2 px-5  flex justify-start items-center cursor-pointer`}
    >
      {Icon && <Icon className=" mr-2" />}
      <span>{title}</span>
    </li>
  );
};
export default DashBoardLink;
