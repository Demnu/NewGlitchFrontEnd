import React, { useState } from "react";
import logo from "./logo.png";
import DashBoardLink from "./DashboardLink";
import ReceiptIcon from "@mui/icons-material/Receipt";
import CalculateIcon from "@mui/icons-material/Calculate";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";

const Dashboard = () => {
  const [links, setSelectedLink] = useState([
    { title: "Orders", icon: ReceiptIcon, selected: false },
    { title: "Calculations", icon: CalculateIcon, selected: false },
    { title: "Recipes", icon: MenuBookIcon, selected: false },
    { title: "Products", icon: ShoppingBagIcon, selected: false },
    { title: "Analytics", icon: AutoGraphIcon, selected: false },
  ]);

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
      <div className=" h-screen bg-yellow-500 w-52 pt-1">
        <div className="flex justify-center">
          <img src={logo} className=" w-2/5" />
        </div>
        <hr className=" border-black shadow-xl" />
        <ul className="flex flex-col">
          {links.map((link, index) => (
            <button key={index} data-id={index} onClick={linkClickHandler}>
              <DashBoardLink
                title={link.title}
                icon={link.icon}
                selected={link.selected}
              />
            </button>
          ))}
        </ul>
      </div>
    </>
  );
};
export default Dashboard;
