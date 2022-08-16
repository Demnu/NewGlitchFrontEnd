import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Dashboard from "./Components/Dashboard/Dashboard";
import Orders from "./Components/Orders/Orders";
import Calculations from "./Components/Calculations/Calculations";
import Recipes from "./Components/Recipes/Recipes";
import Recipe from "./Components/Recipes/Recipe/Recipe";
import MobileDashboard from "./Components/Dashboard/MobileDashboard";
import Calculation from "./Components/Calculations/Calculation/Calculation";
import Topbar from "./Components/Dashboard/Topbar";
import NewRecipe from "./Components/Recipes/NewRecipe/NewRecipe";
import Analytics from "./Components/Analytics/Analytics";
import { useLocation } from "react-router-dom";

import {
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import ReceiptIcon from "@mui/icons-material/Receipt";
import CalculateIcon from "@mui/icons-material/Calculate";
import MenuBookIcon from "@mui/icons-material/MenuBook";
// import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  getCalculations,
  getOrders,
  getRecipes,
  getUnusedProducts,
} from "./myApi";
import axios from "axios";
const queryClient = new QueryClient();
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
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <PrefetchData />

          <MobileDashboard links={links} setSelectedLink={setSelectedLink} />
          <Topbar />
          <div className="flex">
            <div className="flex-none">
              <Dashboard
                className=""
                links={links}
                setSelectedLink={setSelectedLink}
              />
            </div>

            <div className="flex-grow overflow-y-auto overflow-x-auto bg-zinc-200 ">
              {/* <div className=" w-auto py-7 bg-slate-200 "></div> */}
              {/* <hr className=" border-slate-300 shadow-2xl" /> */}

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
                <Route
                  path="/recipes"
                  selectLink={selectLink}
                  element={<Recipes />}
                />
                <Route
                  path="/recipes/:recipeID"
                  selectLink={selectLink}
                  element={<Recipe />}
                />
                <Route
                  path="/recipes/newRecipe"
                  selectLink={selectLink}
                  element={<NewRecipe />}
                />
                <Route
                  path="/analytics"
                  selectLink={selectLink}
                  element={<Analytics />}
                />
                <Route path="*" element={<p>Hi</p>} />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </>
  );
}
const PrefetchData = () => {
  const location = useLocation();
  const queryClient = useQueryClient();
  useEffect(() => {
    queryClient.prefetchQuery(["calculations"], getCalculations, {
      staleTime: 180000,
    });
    queryClient.prefetchQuery(["recipes"], getRecipes, { staleTime: 180000 });
    queryClient.prefetchQuery(["orders"], getOrders, { staleTime: 180000 });
    queryClient.prefetchQuery(["unusedProducts"], getUnusedProducts, {
      staleTime: 180000,
    });
  }, [location]);

  return <></>;
};

export default App;
