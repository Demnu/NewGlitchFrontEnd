import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import Dashboard from "./Components/Dashboard/Dashboard";
import Orders from "./Components/Orders/Orders";
import Calculations from "./Components/Calculations/Calculations";
import Recipes from "./Components/Recipes/Recipes";
import Recipe from "./Components/Recipes/Recipe/Recipe";

import ReceiptIcon from "@mui/icons-material/Receipt";
import CalculateIcon from "@mui/icons-material/Calculate";
import MenuBookIcon from "@mui/icons-material/MenuBook";
// import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import LogoutIcon from "@mui/icons-material/Logout";

import MobileDashboard from "./Components/Dashboard/MobileDashboard";
import Calculation from "./Components/Calculations/Calculation/Calculation";
function App() {
  const [links, setSelectedLink] = useState([
    { title: "Orders", icon: ReceiptIcon, selected: false },
    { title: "Calculations", icon: CalculateIcon, selected: false },
    { title: "Recipes", icon: MenuBookIcon, selected: false },
    // { title: "Products", icon: ShoppingBagIcon, selected: false },
    { title: "Analytics", icon: AutoGraphIcon, selected: false },
    { title: "Logout", icon: LogoutIcon, selected: false },
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
      return newLinks;
    });
  };

  return (
    <>
      <BrowserRouter>
        <MobileDashboard links={links} setSelectedLink={setSelectedLink} />
        <div className="flex">
          <div className="flex-none">
            <Dashboard
              className=""
              links={links}
              setSelectedLink={setSelectedLink}
            />
          </div>

          <div className="flex-grow overflow-y-auto overflow-x-auto bg-slate-200 ">
            <Routes>
              <Route
                path="orders"
                element={<Orders selectLink={selectLink} key={new Date()} />}
              />
              <Route
                path="calculations"
                element={<Calculations selectLink={selectLink} />}
              />
              <Route
                path="/calculations/:calculationID"
                element={<Calculation />}
              />
              <Route path="/recipes" element={<Recipes />} />
              <Route path="/recipes/:recipeID" element={<Recipe />} />
              <Route path="*" element={<p>Hi</p>} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
