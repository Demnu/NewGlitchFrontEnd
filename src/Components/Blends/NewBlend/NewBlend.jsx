import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { createBlend, getUnassignedRecipes } from "../../../myApi";
import Notification from "../../UI/Notification";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
const columns = [{ field: "id", headerName: "Recipe", width: 300 }];
const NewBlend = () => {
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [blendName, setBlendName] = useState("");
  const [recipesInBlend, setRecipesInBlend] = useState([]);
  const [loadingRecipes, setLoadingRecipes] = useState(true);
  const [recipes, setRecipes] = useState([]);
  const [changeRecipes, setChangeRecipes] = useState(true);

  useEffect(() => {
    const response = getUnassignedRecipes();
    response.then((e) => {
      let tempRecipes = e.data;
      tempRecipes.sort((a, b) => {
        return String(a.id).localeCompare(b.id);
      });
      setLoadingRecipes(false);
      setRecipes(e.data);
    });
  }, []);

  const blendNameInputHandler = (e) => {
    setErrorMsg("");
    setError(false);
    setBlendName(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (blendName.trim().length == 0) {
      setError(true);
    } else {
      saveNewBlendMutation.mutate();
    }
  };

  const resetClickHandler = (e) => {
    e.preventDefault();
    setBlendName("");
    setRecipesInBlend([]);
    setLoadingRecipes(true);
    const response = getUnassignedRecipes();
    response.then((e) => {
      let tempRecipes = e.data;
      tempRecipes.sort((a, b) => {
        return String(a.id).localeCompare(b.id);
      });
      setLoadingRecipes(false);
      setRecipes(e.data);
    });
  };

  const saveNewBlendMutation = useMutation(
    () => {
      return createBlend({
        name: blendName.trim(),
        recipes: recipesInBlend,
      });
    },
    {
      onError: (e) => {
        setErrorMsg(e.response.data);
      },
      onSuccess: (e) => {
        setBlendName("");
        setRecipesInBlend([]);
      },
    }
  );

  const removeRecipeFromBlendHandler = (e) => {
    setRecipes((prevRecipes) => {
      let newRecipes = [...prevRecipes];
      newRecipes.push(e.row);
      newRecipes.sort((a, b) => {
        return String(a.id).localeCompare(b.id);
      });
      return newRecipes;
    });
    setRecipesInBlend((prevRecipes) => {
      let newRecipes = [];
      for (let recipe of recipesInBlend) {
        if (recipe.id !== e.row.id) {
          newRecipes.push(recipe);
        }
      }
      return newRecipes;
    });
  };

  const addRecipeToBlendHandler = (e) => {
    setRecipesInBlend((prevRecipes) => {
      let newRecipes = [...prevRecipes];
      newRecipes.push(e.row);
      newRecipes.sort((a, b) => {
        return String(a.id).localeCompare(b.id);
      });
      return newRecipes;
    });
    setRecipes((prevRecipes) => {
      let newRecipes = [];
      for (let recipe of recipes) {
        if (recipe.id !== e.row.id) {
          newRecipes.push(recipe);
        }
      }
      return newRecipes;
    });
  };

  return (
    <>
      <div className="restOfScreenHeight flex flex-wrap gap-7  p-5 ">
        <div className=" flex flex-col rounded-lg bg-zinc-200">
          <h3 className=" w-96 text-center text-xl font-bold">Blend Name</h3>
          <div className=" mt-2 flex gap-2 font-bold"></div>
          <form>
            <div className="mb-2 flex ">
              <input
                onChange={blendNameInputHandler}
                value={blendName}
                className={`border bg-white ${
                  !error
                    ? "border-gray-300 hover:border-blue-300 focus:border-blue-500"
                    : "hover:border-bg-red-300 border-red-500 focus:border-red-600"
                }    w-96 rounded-md p-3 focus:outline-none `}
              />
            </div>
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                setChangeRecipes(!changeRecipes);
              }}
              className=" mb-2  h-10 w-96 flex-grow justify-center rounded-sm  bg-zinc-300 px-1 text-black hover:bg-zinc-100"
            >
              Add/Remove Recipes
            </button>

            <div className="flex flex-grow flex-col gap-2">
              <div className="flex  w-96 gap-2">
                <button
                  type="submit"
                  onClick={submitHandler}
                  className=" h-10 w-1/3 flex-grow justify-center rounded-sm bg-blue-700  px-1 text-white hover:bg-blue-500"
                >
                  Save
                </button>

                <button
                  onClick={resetClickHandler}
                  className={` hover: } h-10 w-1/3 flex-grow justify-center rounded-sm  bg-zinc-300 px-1 text-black
              hover:bg-zinc-100 `}
                >
                  Reset
                </button>
              </div>
              {saveNewBlendMutation.isSuccess && (
                <div className=" w-96">
                  <Notification msg={`Blend saved!`} />
                </div>
              )}
              {errorMsg.length > 0 && (
                <div className=" w-96">
                  <Notification msg={errorMsg} error={true} noTimeout={true} />
                </div>
              )}
            </div>
          </form>
        </div>
        {changeRecipes && (
          <div className=" h-5/6 w-96 bg-white pb-8">
            <div className=" p-2 text-center text-xl font-bold">
              Add Recipes
            </div>
            <div className="h-full">
              <DataGrid
                onRowClick={(e) => {
                  addRecipeToBlendHandler(e);
                }}
                loading={loadingRecipes}
                rows={recipes || []}
                columns={columns}
                density={"compact"}
              />
            </div>
          </div>
        )}

        <div className=" h-5/6 w-96 bg-white pb-8">
          <div className=" p-2 text-center text-xl font-bold">
            Recipes in Blend
          </div>
          <div className="h-full">
            <DataGrid
              onRowClick={(e) => {
                removeRecipeFromBlendHandler(e);
              }}
              loading={loadingRecipes}
              rows={recipesInBlend || []}
              columns={columns}
              disableSelectionOnClick={true}
              density={"compact"}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default NewBlend;
