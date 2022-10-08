import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import Dashboard from "./Components/Dashboard/Dashboard";
import Orders from "./Components/Orders/Orders";
import Calculations from "./Components/Calculations/Calculations";
import Recipes from "./Components/Recipes/Recipes";
import Recipe from "./Components/Recipes/Recipe/Recipe";
import MobileDashboard from "./Components/Dashboard/MobileDashboard";
import Calculation from "./Components/Calculations/Calculation/Calculation";
import Topbar from "./Components/Dashboard/Topbar";
import NewRecipe from "./Components/Recipes/NewRecipe/NewRecipe";
import RecipeCode from "./Components/RecipeCodes/RecipeCode/RecipeCode";
import Analytics from "./Components/Analytics/Analytics";
import LoginPage from "./Components/Login/LoginPage";
import RequireAuth from "./RequireAuth";
import { useLocation } from "react-router-dom";

import {
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import ReceiptIcon from "@mui/icons-material/Receipt";
import CalculateIcon from "@mui/icons-material/Calculate";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
// import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  authenticate,
  getCalculations,
  getOrders,
  getRecipeCodes,
  getRecipes,
  getUnusedProducts,
  logoutServer,
} from "./myApi";

import UserContext from "./Store/UserContext";
import RecipeCodes from "./Components/RecipeCodes/RecipeCodes";
import NewRecipeCode from "./Components/RecipeCodes/newCode/NewRecipeCode";
const queryClient = new QueryClient();

function App() {
  const [loggedIn, setLoggedIn] = useState(true);

  const logout = () => {
    const response = logoutServer();
    queryClient.clear();
    setLoggedIn(false);
  };

  const [links, setSelectedLink] = useState([
    { title: "Orders", icon: ReceiptIcon, selected: false },
    { title: "Calculations", icon: CalculateIcon, selected: false },
    { title: "Recipes", icon: MenuBookIcon, selected: false },
    { title: "Codes", icon: FormatListNumberedIcon, selected: false },
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
        <UserContext.Provider value={{ loggedIn, setLoggedIn, logout }}>
          <BrowserRouter>
            {loggedIn && (
              <>
                <PrefetchData />
                <MobileDashboard
                  links={links}
                  setSelectedLink={setSelectedLink}
                />
                <Topbar />
              </>
            )}

            <div className={` ${loggedIn && "flex"}`}>
              {loggedIn && (
                <div className="flex-none">
                  <Dashboard
                    className=""
                    links={links}
                    setSelectedLink={setSelectedLink}
                    setLoggedIn={setLoggedIn}
                  />
                </div>
              )}

              <div
                className={`${
                  loggedIn &&
                  "flex-grow overflow-x-auto overflow-y-auto bg-zinc-200 "
                }`}
              >
                <Routes>
                  <Route
                    path="/login"
                    element={<LoginPage selectLink={selectLink} />}
                  />
                  <Route
                    path="/logout"
                    element={<LoginPage selectLink={selectLink} />}
                  />
                  <Route
                    path="/orders"
                    element={
                      <RequireAuth>
                        <Orders selectLink={selectLink} key={new Date()} />
                      </RequireAuth>
                    }
                  />
                  <Route
                    path="/calculations"
                    element={
                      <RequireAuth>
                        <Calculations selectLink={selectLink} />
                      </RequireAuth>
                    }
                  />
                  <Route
                    path="/codes"
                    element={
                      <RequireAuth>
                        <RecipeCodes selectLink={selectLink} />
                      </RequireAuth>
                    }
                  />
                  <Route
                    path="/codes/newRecipeCode"
                    selectLink={selectLink}
                    element={
                      <RequireAuth>
                        <NewRecipeCode />
                      </RequireAuth>
                    }
                  />
                  <Route
                    path="/codes/:recipeCodeID"
                    selectLink={selectLink}
                    element={
                      <RequireAuth>
                        <RecipeCode />
                      </RequireAuth>
                    }
                  />
                  <Route
                    path="/calculations/:calculationID"
                    element={
                      <RequireAuth>
                        <Calculation />
                      </RequireAuth>
                    }
                  />
                  <Route
                    path="/recipes"
                    selectLink={selectLink}
                    element={
                      <RequireAuth>
                        <Recipes />
                      </RequireAuth>
                    }
                  />
                  <Route
                    path="/recipes/:recipeID"
                    selectLink={selectLink}
                    element={
                      <RequireAuth>
                        <Recipe />
                      </RequireAuth>
                    }
                  />
                  <Route
                    path="/recipes/newRecipe"
                    selectLink={selectLink}
                    element={
                      <RequireAuth>
                        <NewRecipe />
                      </RequireAuth>
                    }
                  />
                  <Route
                    path="/analytics"
                    selectLink={selectLink}
                    element={
                      <RequireAuth>
                        <Analytics />
                      </RequireAuth>
                    }
                  />
                  <Route path="*" element={<Navigate to="/orders" />} />
                </Routes>
              </div>
            </div>
          </BrowserRouter>
          <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        </UserContext.Provider>
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
    queryClient.prefetchQuery(["codes"], getRecipeCodes, { staleTime: 180000 });
    queryClient.prefetchQuery(["recipes"], getRecipes, { staleTime: 180000 });
    queryClient.prefetchQuery(["orders"], getOrders, { staleTime: 180000 });
    queryClient.prefetchQuery(["unusedProducts"], getUnusedProducts, {
      staleTime: 180000,
    });
  }, [location]);

  return <></>;
};

export default App;
