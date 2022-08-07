import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import RecipeTextInput from "../RecipeTextInput";

const getBeansArray = (recipe) => {
  let savedBeansArray = [];

  if (recipe.bean1Name) {
    savedBeansArray.push({
      name: recipe.bean1Name,
      amount: recipe.bean1Amount,
    });
  }
  if (recipe.bean2Name) {
    savedBeansArray.push({
      name: recipe.bean2Name,
      amount: recipe.bean2Amount,
    });
  }
  if (recipe.bean3Name) {
    savedBeansArray.push({
      name: recipe.bean3Name,
      amount: recipe.bean3Amount,
    });
  }
  if (recipe.bean4Name) {
    savedBeansArray.push({
      name: recipe.bean4Name,
      amount: recipe.bean4Amount,
    });
  }
  if (recipe.bean5Name) {
    savedBeansArray.push({
      name: recipe.bean5Name,
      amount: recipe.bean5Amount,
    });
  }
  if (recipe.bean6Name) {
    savedBeansArray.push({
      name: recipe.bean6Name,
      amount: recipe.bean6Amount,
    });
  }
  if (recipe.bean7Name) {
    savedBeansArray.push({
      name: recipe.bean7Name,
      amount: recipe.bean7Amount,
    });
  }
  if (recipe.bean8Name) {
    savedBeansArray.push({
      name: recipe.bean8Name,
      amount: recipe.bean8Amount,
    });
  }
  return savedBeansArray;
};

const Recipe = (selectLink) => {
  const location = useLocation();
  const [recipe, setRecipe] = useState(location.state);
  const [savedBeans, setSavedBeans] = useState([]);
  const [numberOfSavedBeans, setNumberOfSavedBeans] = useState([]);
  useEffect(() => {
    setSavedBeans(getBeansArray(recipe));
  }, []);
  return (
    <div className="flex justify-center h-screen p-2">
      <div className=" bg-white w-min h-min p-2 rounded-md shadow-md">
        <h1 className=" font-bold text-center text-2xl">{recipe.id}</h1>
        <div className=" flex font-bold gap-2">
          <h2 className=" w-40">Bean</h2>
          <h2 className=" w-40">Amount(g)</h2>
        </div>
        <div className="">
          {savedBeans.map((bean) => (
            <div
              className="flex w-min rounded-sm py-1 gap-2 mb-1 "
              key={bean.name}
            >
              <div className="">
                <RecipeTextInput value={bean.name} />
              </div>
              <div>
                <RecipeTextInput value={bean.amount} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Recipe;
