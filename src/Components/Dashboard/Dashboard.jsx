import React from "react";
import { Link } from "react-router-dom";
import logo from "./logo.png";
import DashBoardLink from "./DashboardLink";

const Dashboard = ({ links, setSelectedLink }) => {
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
      <div className="hidden  dashboard:block h-screen bg-yellow-400 pt-1 w-48 ">
        <div className="flex justify-center">
          <img src={logo} alt="Glitch" className=" w-2/5" />
        </div>
        <div className="">
          <hr className=" border-black shadow-xl" />
          <ul className="flex flex-col">
            {links.map((link, index) => (
              <button key={index} data-id={index} onClick={linkClickHandler}>
                <Link to={link.title.toLowerCase()}>
                  <DashBoardLink
                    title={link.title}
                    icon={link.icon}
                    selected={link.selected}
                  />
                </Link>
              </button>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
