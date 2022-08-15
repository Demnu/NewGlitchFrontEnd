import React, { useState } from "react";
import { useEffect } from "react";
import { getRecipes } from "../../myApi";
import RecipesTable from "./RecipesTable";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
const Recipes = () => {
  const navigate = useNavigate();

  const { isLoading, data } = useQuery(["recipes"], getRecipes);
  return (
    <div className="restOfScreenHeight flex flex-col p-2 ">
      <button
        className=" bg-blue-700 hover:bg-blue-500 rounded-sm text-white mb-2 p-2 w-52"
        onClick={() => {
          navigate("/recipes/newRecipe");
        }}
      >
        New Recipe
      </button>
      <div className=" flex-grow bg-white cursor-pointer">
        <RecipesTable recipes={data?.data || []} loading={isLoading} />
      </div>
    </div>
  );
};
export default Recipes;
