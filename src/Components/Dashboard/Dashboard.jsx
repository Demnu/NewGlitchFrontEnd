import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "./logo.png";
import DashBoardLink from "./DashboardLink";
import UserContext from "../../Store/UserContext";
import { useNavigate } from "react-router-dom";
const Dashboard = ({ links, setSelectedLink }) => {
  const navigate = useNavigate();
  const userCtx = useContext(UserContext);
  const linkClickHandler = (event) => {
    const index = event.currentTarget.dataset.id;
    if (Number(index) === links.length - 1) {
      userCtx.logout();
      navigate("/login");
    }
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
      <div className="hidden  dashboard:block restOfScreenHeight bg-zinc-800 w-48 ">
        {/* <div className="flex justify-center">
          <img src={logo} alt="Glitch" className=" w-2/5" />
        </div> */}
        <div className="">
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
