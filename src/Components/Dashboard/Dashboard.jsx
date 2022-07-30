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
      <div className=" h-screen bg-yellow-400  w-52 pt-1">
        <div className="flex bgy justify-center">
          <img src={logo} alt="Glitch" className=" w-2/5" />
        </div>
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
    </>
  );
};
export default Dashboard;
