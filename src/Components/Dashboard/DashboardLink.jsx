import React from "react";
const DashBoardLink = ({ selected, title, icon: Icon }) => {
  return (
    <>
      {title.match("Logout") && <hr className=" border-black shadow-xl" />}
      <li
        className={`${selected === true ? "bg-zinc-700" : "bg-zinc-800"} ${
          selected === false && "hover:bg-zinc-600"
        } text-xl  py-2 px-5  flex justify-start items-center cursor-pointer text-slate-300`}
      >
        {Icon && <Icon className="mr-2" />}
        <span>{title}</span>
      </li>
    </>
  );
};
export default DashBoardLink;
