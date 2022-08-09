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
  const [beans, setBeans] = useState([]);
  const [savedBeans, setSavedBeans] = useState([]);
  const [numberOfSavedBeans, setNumberOfSavedBeans] = useState([]);
  const [inputDivWidth, setInputDivWidth] = useState();
  useEffect(() => {
    setSavedBeans(getBeansArray(recipe));
    setBeans(getBeansArray(recipe));
  }, []);
  const clickAddBeanHandler = () => {
    setBeans((prevSavedBeans) => {
      let newSavedBeans = [...prevSavedBeans];
      newSavedBeans.push({ name: "", amount: "" });
      return newSavedBeans;
    });
  };
  const clickRemoveBeanHandler = (name) => {
    setBeans((prevSavedBeans) => {
      let newSavedBeans = [...prevSavedBeans];
      for (let i = 0; i < newSavedBeans.length; i++) {
        if (newSavedBeans[i].name.match(name)) {
          newSavedBeans.splice(i, 1);
        }
      }
      console.log(newSavedBeans);
      return newSavedBeans;
    });
  };
  const resetToOriginalValue = () => {
    setBeans(savedBeans);
  };
  return (
    <div className="flex flex-col restOfScreenHeight p-2 ">
      {console.log(inputDivWidth)}
      <div className="  px-2 py-2 flex flex-wrap justify-start gap-10 rounded-lg">
        <h1 className=" font-bold  text-3xl text-center w-80">{recipe.id}</h1>
        <div className="flex flex-col bg-white p-2 rounded-lg">
          <div className=" flex font-bold gap-2">
            <h2 className=" text-center w-48">Bean</h2>
            <h2 className=" text-center w-48">Amount(g)</h2>
          </div>
          {beans.map((bean) => (
            <div
              className="flex w-min rounded-sm py-1 gap-2 mb-1 "
              key={bean.name}
            >
              <div className="flex gap-2">
                <RecipeTextInput value={bean.name} />
                <RecipeTextInput value={bean.amount} />
              </div>

              <div className=" pt-3">
                {" "}
                <RemoveIcon
                  onClick={() => {
                    clickRemoveBeanHandler(bean.name);
                  }}
                  className=" rounded-sm cursor-pointer hover:bg-slate-100"
                />
              </div>
            </div>
          ))}

          <div className="flex flex-col flex-grow gap-2">
            <button
              style={{ width: "392px" }}
              className=" justify-center bg-slate-100 hover:bg-slate-200  h-7"
              onClick={clickAddBeanHandler}
            >
              <AddIcon />
            </button>
            <button
              style={{ width: "392px" }}
              className=" justify-center bg-slate-100 hover:bg-slate-200  h-7"
              onClick={resetToOriginalValue}
            >
              Reset Values
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Recipe;
