import React, { useState } from "react";
import { useEffect } from "react";
import { getRecipes } from "../../myApi";
import RecipesTable from "./RecipesTable";
const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const response = getRecipes();
    response.then((results) => {
      console.log(results.data);
      setRecipes(results.data);
      setLoading(false);
    });
  }, []);
  return (
    <div className="restOfScreenHeight flex p-2 ">
      <div className=" flex-grow bg-white cursor-pointer">
        <RecipesTable recipes={recipes} loading={loading} />
      </div>
    </div>
  );
};
export default Recipes;
