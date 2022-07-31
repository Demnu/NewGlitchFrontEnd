import React from "react";
import { Link } from "react-router-dom";
import logo from "./logo.png";
import DashBoardLink from "./DashboardLink";

const MobileDashboard = ({ links, setSelectedLink }) => {
  const linkClickHandler = (event) => {
    const index = event.currentTarget.dataset.id;
    setSelectedLink((prevLinks) => {
      const newLinks = [...prevLinks];
      for (let link of newLinks) {
        link.selected = false;
      }
      newLinks[index].selected = true;
      return newLinks;
    });
  };

  return (
    <>
      <div className="bg-yellow-400 pl-2 h-10 w-screen dashboard:hidden flex justify-between">
        <img src={logo} alt="Glitch" className="w-14" />
        <ul className="flex">
          {links.map((link, index) => (
            <Link
              className={`hover:underline px-2 ${
                link.selected === true
                  ? "bg-yellow-300 underline"
                  : "bg-yellow-400 hover:bg-yellow-500 "
              }`}
              key={index}
              to={link.title.toLowerCase()}
            >
              <p className=" mt-2">{link.title}</p>
            </Link>
          ))}
        </ul>
        <div className="w-14"></div>
      </div>
    </>
  );
};
export default MobileDashboard;
