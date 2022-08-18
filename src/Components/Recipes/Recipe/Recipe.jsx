import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RecipeTextInput from "../RecipeTextInput";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useMutation } from "@tanstack/react-query";
import { deleteRecipe, updateRecipe } from "../../../myApi";
import Notification from "../../UI/Notification";
const getBeansArray = (recipe) => {
  let savedBeansArray = [];

  if (recipe.bean1Name) {
    savedBeansArray.push({
      name: recipe.bean1Name,
      amount: recipe.bean1Amount,
      id: 1,
      error: false,
    });
  }
  if (recipe.bean2Name) {
    savedBeansArray.push({
      name: recipe.bean2Name,
      amount: recipe.bean2Amount,
      id: 2,
      error: false,
    });
  }
  if (recipe.bean3Name) {
    savedBeansArray.push({
      name: recipe.bean3Name,
      amount: recipe.bean3Amount,
      id: 3,
      error: false,
    });
  }
  if (recipe.bean4Name) {
    savedBeansArray.push({
      name: recipe.bean4Name,
      amount: recipe.bean4Amount,
      id: 4,
      error: false,
    });
  }
  if (recipe.bean5Name) {
    savedBeansArray.push({
      name: recipe.bean5Name,
      amount: recipe.bean5Amount,
      id: 5,
      error: false,
    });
  }
  if (recipe.bean6Name) {
    savedBeansArray.push({
      name: recipe.bean6Name,
      amount: recipe.bean6Amount,
      id: 6,
      error: false,
    });
  }
  if (recipe.bean7Name) {
    savedBeansArray.push({
      name: recipe.bean7Name,
      amount: recipe.bean7Amount,
      id: 7,
      error: false,
    });
  }
  if (recipe.bean8Name) {
    savedBeansArray.push({
      name: recipe.bean8Name,
      amount: recipe.bean8Amount,
      id: 8,
      error: false,
    });
  }
  return savedBeansArray;
};

const Recipe = (selectLink) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showError, setShowError] = useState(false);
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

  const resetRecipeMutation = useMutation(
    () => {
      const recipeReq = {
        _id: recipe._id,
        product: recipe.id,
        bean1Name: savedBeans[0]?.name || "",
        bean1Amount: savedBeans[0]?.amount || "",
        bean2Name: savedBeans[1]?.name || "",
        bean2Amount: savedBeans[1]?.amount,
        bean3Name: savedBeans[2]?.name || "",
        bean3Amount: savedBeans[2]?.amount || "",
        bean4Name: savedBeans[3]?.name || "",
        bean4Amount: savedBeans[3]?.amount || "",
        bean5Name: savedBeans[4]?.name || "",
        bean5Amount: savedBeans[4]?.amount || "",
        bean6Name: savedBeans[5]?.name || "",
        bean6Amount: savedBeans[5]?.amount || "",
        bean7Name: savedBeans[6]?.name || "",
        bean7Amount: savedBeans[6]?.amount || "",
        bean8Name: savedBeans[7]?.name || "",
        bean8Amount: savedBeans[7]?.amount || "",
      };
      setBeans(savedBeans);
      return updateRecipe(recipeReq);
    },
    {
      onMutate: () => {},
      onError: (err) => {},
      onSuccess: () => {},
    }
  );

  const updateRecipeFormatter = () => {
    setShowError(false);
    let error = false;
    const formattedBeans = [];
    for (let i = 0; i < beans.length; i++) {
      if (
        isNaN(beans[i].amount) ||
        beans[i].amount === "" ||
        beans[i].amount <= 0
      ) {
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
    setBeans(formattedBeans);
    if (!error) {
      const recipeReq = {
        _id: recipe._id,
        product: recipe.id,
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
      setSavedBeans(formattedBeans);
      updateRecipeMutation.mutate(recipeReq);
    } else {
      setShowError(true);
    }
  };

  const updateRecipeMutation = useMutation((recipeReq) => {
    return updateRecipe(recipeReq);
  });

  const deleteRecipeMutation = useMutation(
    () => {
      return deleteRecipe(recipe._id);
    },
    {
      onSuccess: () => {
        navigate("/recipes");
      },
    }
  );

  const changeBeanNameHandler = (e, id) => {
    setShowError(false);
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
    setShowError(false);
    let tempBeans = [...beans];
    for (let bean of tempBeans) {
      if (bean.id === id) {
        bean.error = false;
        bean.amount = e.target.value;
      }
    }
    setBeans(tempBeans);
  };

  return (
    <>
      <div className="restOfScreenHeight flex flex-col p-5 ">
        <div className=" flex flex-col rounded-lg bg-zinc-200">
          <h1
            style={{ width: "392px" }}
            className=" mb-5  w-80 text-center text-3xl font-bold"
          >
            {recipe.id}
          </h1>
          <div className=" flex gap-2 font-bold">
            <h2 className=" w-48 text-center">Bean</h2>
            <h2 className=" w-48 text-center">Amount(g)</h2>
          </div>
          {beans.map((bean) => (
            <div
              className="mb-2 flex w-min gap-2 rounded-sm py-1"
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
                  className=" cursor-pointer rounded-sm hover:bg-slate-100"
                />
              </div>
            </div>
          ))}
          <div className="flex flex-grow flex-col gap-2">
            {beans.length <= 7 && (
              <button
                style={{ width: "392px" }}
                className=" h-7 justify-center rounded-sm  bg-zinc-300 hover:bg-zinc-100"
                onClick={clickAddBeanHandler}
              >
                <AddIcon />
              </button>
            )}
            <div style={{ width: "392px" }} className="flex  gap-2">
              <button
                onClick={() => {
                  updateRecipeFormatter();
                }}
                className=" h-10 w-1/3 flex-grow justify-center rounded-sm bg-blue-700  px-1 text-white hover:bg-blue-500"
              >
                Save
              </button>
              <button
                className={` hover: } h-10 w-1/3 flex-grow justify-center rounded-sm  bg-zinc-300 px-1 text-black
              hover:bg-zinc-100 `}
                onClick={resetRecipeMutation.mutate}
              >
                Reset
              </button>
              <button
                className=" h-10 w-1/3 flex-grow justify-center rounded-sm bg-red-700  px-1 text-white hover:bg-red-500"
                onClick={deleteRecipeMutation.mutate}
              >
                Delete
              </button>
            </div>
            <div
              className="mt-3 flex flex-col gap-2"
              style={{ width: "392px" }}
            >
              {resetRecipeMutation.isSuccess && (
                <Notification msg={"Recipe reset"} />
              )}
              {resetRecipeMutation.isError && (
                <Notification msg={"Error! Recipe not reset"} error={true} />
              )}
              {updateRecipeMutation.isSuccess && (
                <Notification msg={"Recipe updated"} />
              )}
              {updateRecipeMutation.isError && (
                <Notification msg={"Error! Recipe not updated"} error={true} />
              )}
              {deleteRecipeMutation.isLoading && (
                <Notification msg={"Deleting recipe"} />
              )}
              {showError && (
                <Notification msg={"Error! Input/s are invalid"} error={true} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Recipe;
