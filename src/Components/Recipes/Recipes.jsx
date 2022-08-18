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
        className=" mb-2 w-52 rounded-sm bg-blue-700 p-2 text-white hover:bg-blue-500"
        onClick={() => {
          navigate("/recipes/newRecipe");
        }}
      >
        New Recipe
      </button>
      <div className=" flex-grow cursor-pointer bg-white">
        <RecipesTable recipes={data?.data || []} loading={isLoading} />
      </div>
    </div>
  );
};
export default Recipes;
