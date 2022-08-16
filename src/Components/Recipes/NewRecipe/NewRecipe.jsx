import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RecipeTextInput from "../RecipeTextInput";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUnusedProducts, saveRecipe, updateRecipe } from "../../../myApi";
import Notification from "../../UI/Notification";
import { Autocomplete, TextField } from "@mui/material";
import { style } from "@mui/system";

const NewRecipe = (selectLink) => {
  const { isLoading, data } = useQuery(["unusedProducts"], getUnusedProducts);
  const navigate = useNavigate();
  const location = useLocation();
  const [beans, setBeans] = useState([
    { name: "", amount: "", id: Math.random(), error: false },
  ]);
  const [recipeName, setRecipeName] = useState("");
  const [recipeNameEmpty, setRecipeNameEmpty] = useState(false);
  const [showError, setShowError] = useState(false);
  const clickAddBeanHandler = () => {
    setBeans((prevBeans) => {
      let newBeans = [...prevBeans];
      newBeans.push({ name: "", amount: "", id: Math.random(), error: false });
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

  const resetRecipe = () => {
    setRecipeName("");
    setBeans([{ name: "", amount: "", id: Math.random(), error: false }]);
  };

  const saveNewRecipeFormatter = () => {
    setShowError(false);
    let error = false;
    const formattedBeans = [];
    for (let i = 0; i < beans.length; i++) {
      if (isNaN(beans[i].amount) || beans[i].amount === "") {
        beans[i].error = true;
        error = true;
      }
      if (beans[i].name === "" && !isNaN(beans[i].amount)) {
        beans[i].error = true;
        error = true;
      }
      if (beans[i].name != "" || beans[i].amount != "") {
        formattedBeans.push(beans[i]);
      }
    }
    if (formattedBeans.length === 0) {
      formattedBeans.push({
        name: "",
        amount: "",
        id: Math.random(),
        error: true,
      });
    }
    if (recipeName.trim().length <= 0) {
      console.log("hihiihih");
      error = true;
      setRecipeNameEmpty(true);
    }
    setBeans(formattedBeans);
    if (!error) {
      const recipeReq = {
        product: recipeName,
        bean1Name: formattedBeans[0]?.name || "",
        bean1Amount: formattedBeans[0]?.amount || "",
        bean2Name: formattedBeans[1]?.name || "",
        bean2Amount: formattedBeans[1]?.amount,
        bean3Name: formattedBeans[2]?.name || "",
        bean3Amount: formattedBeans[2]?.amount || "",
        bean4Name: formattedBeans[3]?.name || "",
        bean4Amount: formattedBeans[3]?.amount || "",
        bean5Name: formattedBeans[4]?.name || "",
        bean5Amount: formattedBeans[4]?.amount || "",
        bean6Name: formattedBeans[5]?.name || "",
        bean6Amount: formattedBeans[5]?.amount || "",
        bean7Name: formattedBeans[6]?.name || "",
        bean7Amount: formattedBeans[6]?.amount || "",
        bean8Name: formattedBeans[7]?.name || "",
        bean8Amount: formattedBeans[7]?.amount || "",
      };
      saveNewRecipeMutation.mutate(recipeReq);
    } else {
      setShowError(true);
    }
  };

  const saveNewRecipeMutation = useMutation(
    (recipeReq) => {
      return saveRecipe(recipeReq);
    },
    {
      onSuccess: () => {
        resetRecipe();
      },
    }
  );

  const changeBeanNameHandler = (e, id) => {
    let tempBeans = [...beans];
    for (let bean of tempBeans) {
      if (bean.id === id) {
        bean.error = false;
        bean.name = e.target.value;
      }
    }
    setBeans(tempBeans);
  };

  const changeBeanAmountHandler = (e, id) => {
    let tempBeans = [...beans];
    for (let bean of tempBeans) {
      if (bean.id === id) {
        bean.error = false;
        bean.amount = e.target.value;
      }
    }
    setBeans(tempBeans);
  };
  const options = data?.data.unusedProducts.map((product) => product.label);

  return (
    <>
      <div className="flex flex-col restOfScreenHeight p-5 ">
        <div className=" flex flex-col bg-zinc-200 rounded-lg">
          <h3
            style={{ width: "392px" }}
            className=" text-center text-xl font-bold pb-2"
          >
            Recipe Name
          </h3>
          <div className=" bg-white rounded-lg" style={{ width: "392px" }}>
            <Autocomplete
              loading={isLoading}
              disablePortal
              options={options || []}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  style={{ width: "392px" }}
                  error={recipeNameEmpty}
                />
              )}
              onChange={(e, value) => {
                setRecipeNameEmpty(false);
                setRecipeName(value || "");
              }}
              value={recipeName}
            />
          </div>

          <div className=" flex font-bold gap-2 mt-2">
            <h2 className=" text-center w-48">Bean</h2>
            <h2 className=" text-center w-48">Amount(g)</h2>
          </div>
          {beans.map((bean) => (
            <div
              className="flex w-min rounded-sm py-1 gap-2 mb-2"
              key={bean.id}
            >
              <div className="flex gap-2">
                <RecipeTextInput
                  id={bean.id}
                  error={bean.error}
                  value={bean.name}
                  onChange={changeBeanNameHandler}
                />
                <RecipeTextInput
                  id={bean.id}
                  error={bean.error}
                  value={bean.amount}
                  type={"number"}
                  onChange={changeBeanAmountHandler}
                />
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
              <button
                onClick={() => {
                  saveNewRecipeFormatter();
                }}
                className=" w-1/3 flex-grow justify-center bg-blue-700 hover:bg-blue-500 text-white  h-10 rounded-sm px-1"
              >
                Save
              </button>

              <button
                className={` w-1/3 flex-grow justify-center bg-zinc-300 hover:bg-zinc-100 text-black hover:  h-10 rounded-sm px-1
              } `}
                onClick={resetRecipe}
              >
                Reset
              </button>
            </div>
            <div className="flex flex-col gap-2 mt-3">
              {saveNewRecipeMutation.isSuccess && (
                <Notification msg={`Recipe saved!`} />
              )}
              {showError && (
                <Notification
                  msg={`Error! Input/s invalid`}
                  error={showError}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default NewRecipe;
