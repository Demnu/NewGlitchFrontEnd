import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import Dashboard from "./Components/Dashboard/Dashboard";
import Orders from "./Components/Orders/Orders";
import ReceiptIcon from "@mui/icons-material/Receipt";
import CalculateIcon from "@mui/icons-material/Calculate";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
function App() {
  const [links, setSelectedLink] = useState([
    { title: "Orders", icon: ReceiptIcon, selected: false },
    { title: "Calculations", icon: CalculateIcon, selected: false },
    { title: "Recipes", icon: MenuBookIcon, selected: false },
    { title: "Products", icon: ShoppingBagIcon, selected: false },
    { title: "Analytics", icon: AutoGraphIcon, selected: false },
  ]);

  const selectLink = (linkTitle) => {
    setSelectedLink((prevLinks) => {
      const newLinks = [...prevLinks];
      for (let link of newLinks) {
        if (link.title.match(linkTitle)) {
          link.selected = true;
        } else {
          link.selected = false;
        }
      }
      newLinks[0].selected = true;
      return newLinks;
    });
  };

  const [linkName, setLinkName] = useState();
  return (
    <>
      <BrowserRouter>
        <div className="flex">
          <Dashboard links={links} setSelectedLink={setSelectedLink} />
          <Routes>
            <Route path="orders" element={<Orders selectLink={selectLink} />} />
            <Route path="*" element={<p>Hi</p>} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
