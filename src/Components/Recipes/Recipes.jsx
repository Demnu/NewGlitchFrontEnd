import React, { useState } from "react";
import { useEffect } from "react";
import { getRecipes } from "../../myApi";
import RecipesTable from "./RecipesTable";
import { useQuery } from "@tanstack/react-query";

const Recipes = () => {
  const { isLoading, data } = useQuery(["recipes"], getRecipes);
  return (
    <div className="restOfScreenHeight flex p-2 ">
      <div className=" flex-grow bg-white cursor-pointer">
        <RecipesTable recipes={data.data} loading={isLoading} />
      </div>
    </div>
  );
};
export default Recipes;
