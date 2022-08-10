import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import RecipeTextInput from "../RecipeTextInput";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
const getBeansArray = (recipe) => {
  let savedBeansArray = [];

  if (recipe.bean1Name) {
    savedBeansArray.push({
      name: recipe.bean1Name,
      amount: recipe.bean1Amount,
      id: 1,
    });
  }
  if (recipe.bean2Name) {
    savedBeansArray.push({
      name: recipe.bean2Name,
      amount: recipe.bean2Amount,
      id: 2,
    });
  }
  if (recipe.bean3Name) {
    savedBeansArray.push({
      name: recipe.bean3Name,
      amount: recipe.bean3Amount,
      id: 3,
    });
  }
  if (recipe.bean4Name) {
    savedBeansArray.push({
      name: recipe.bean4Name,
      amount: recipe.bean4Amount,
      id: 4,
    });
  }
  if (recipe.bean5Name) {
    savedBeansArray.push({
      name: recipe.bean5Name,
      amount: recipe.bean5Amount,
      id: 5,
    });
  }
  if (recipe.bean6Name) {
    savedBeansArray.push({
      name: recipe.bean6Name,
      amount: recipe.bean6Amount,
      id: 6,
    });
  }
  if (recipe.bean7Name) {
    savedBeansArray.push({
      name: recipe.bean7Name,
      amount: recipe.bean7Amount,
      id: 7,
    });
  }
  if (recipe.bean8Name) {
    savedBeansArray.push({
      name: recipe.bean8Name,
      amount: recipe.bean8Amount,
      id: 8,
    });
  }
  return savedBeansArray;
};

const Recipe = (selectLink) => {
  const location = useLocation();
  const [recipe, setRecipe] = useState(location.state);
  const [beans, setBeans] = useState([]);
  const [savedBeans, setSavedBeans] = useState([]);
  const [numberOfSavedBeans, setNumberOfSavedBeans] = useState([]);
  const [inputDivWidth, setInputDivWidth] = useState();
  useEffect(() => {
    setSavedBeans(getBeansArray(recipe));
    setBeans(getBeansArray(recipe));
  }, []);
  const clickAddBeanHandler = () => {
    setBeans((prevBeans) => {
      let newBeans = [...prevBeans];
      newBeans.push({ name: "", amount: "", id: Math.random() });
      return newBeans;
    });
  };
  const clickRemoveBeanHandler = (id) => {
    if (beans.length > 1) {
      setBeans((prevBeans) => {
        let newBeans = [...prevBeans];
        for (let i = 0; i < newBeans.length; i++) {
          if (newBeans[i].id === id) {
            newBeans.splice(i, 1);
          }
        }
        return newBeans;
      });
    }
  };
  const resetToOriginalValue = () => {
    setBeans(savedBeans);
  };
  function arraysEqual() {
    return JSON.stringify(beans) == JSON.stringify(savedBeans);
  }

  return (
    <div className="flex flex-col restOfScreenHeight p-2 ">
      <div className="p-5 flex flex-col bg-zinc-200 rounded-lg">
        <h1
          style={{ width: "392px" }}
          className=" font-bold  text-3xl text-center w-80 mb-5"
        >
          {recipe.id}
        </h1>
        <div className=" flex font-bold gap-2">
          <h2 className=" text-center w-48">Bean</h2>
          <h2 className=" text-center w-48">Amount(g)</h2>
        </div>
        {beans.map((bean) => (
          <div className="flex w-min rounded-sm py-1 gap-2 mb-2" key={bean.id}>
            <div className="flex gap-2">
              <RecipeTextInput value={bean.name} />
              <RecipeTextInput value={bean.amount} />
            </div>

            <div className=" pt-3">
              <RemoveIcon
                onClick={() => {
                  clickRemoveBeanHandler(bean.id);
                }}
                className=" rounded-sm cursor-pointer hover:bg-slate-100"
              />
            </div>
          </div>
        ))}
        <div className="flex flex-col flex-grow gap-2">
          {beans.length <= 7 && (
            <button
              style={{ width: "392px" }}
              className=" justify-center bg-zinc-300 hover:bg-zinc-100  h-7 rounded-sm"
              onClick={clickAddBeanHandler}
            >
              <AddIcon />
            </button>
          )}
          <div style={{ width: "392px" }} className="flex  gap-2">
            <button className="flex-grow justify-center bg-blue-700 hover:bg-blue-500 text-white  h-10 rounded-sm">
              Update Recipe
            </button>
            <button
              className={` flex-grow justify-center bg-zinc-300 hover:bg-zinc-100 text-black hover:  h-10 rounded-sm
              } `}
              onClick={resetToOriginalValue}
            >
              Reset Values
            </button>
            <button className="flex-grow justify-center bg-red-700 hover:bg-red-500 text-white  h-10 rounded-sm">
              Delete Recipe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Recipe;
