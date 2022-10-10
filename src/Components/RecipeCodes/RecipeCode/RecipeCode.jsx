import { useMutation } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";

import React, { useState } from "react";
import { deleteRecipeCode, updateRecipeCode } from "../../../myApi";
import Notification from "../../UI/Notification";
const RecipeCode = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [code, setCode] = useState(location.state.code || "");
  const [blendName, setBlendName] = useState(location.state.blendName || "");
  const codeInputHandler = (e) => {
    setErrorMsg("");
    setError(false);
    setCode(e.target.value);
  };
  const blendNameInputHandler = (e) => {
    setErrorMsg("");
    setError(false);
    setBlendName(e.target.value);
  };

  const updateHandler = () => {
    if (blendName.trim().length == 0 || code.trim().length == 0) {
      setError(true);
    } else {
      updateRecipeCodeMutation.mutate();
    }
  };

  const resetClickHandler = () => {
    setCode(location.state.code);
    setBlendName(location.state.blendName);
  };
  const deleteHandler = () => {
    deleteRecipeCodeMutation.mutate();
  };

  const deleteRecipeCodeMutation = useMutation(
    () => {
      return deleteRecipeCode(location.state.id);
    },
    {
      onSuccess: () => {
        navigate("/codes");
      },
    }
  );

  const updateRecipeCodeMutation = useMutation(
    () => {
      return updateRecipeCode({
        id: location.state.id,
        code: code,
        blendName: blendName,
      });
    },
    {
      onError: (e) => {
        setErrorMsg(e.response.data);
      },
      onSuccess: (e) => {
        location.state.code = code;
        location.state.blendName = blendName;
      },
    }
  );

  return (
    <>
      <div className="restOfScreenHeight flex flex-col p-5 ">
        <div className=" flex flex-col rounded-lg bg-zinc-200">
          <h3
            style={{ width: "392px" }}
            className=" pb-2 text-center text-xl font-bold"
          >
            {location.state.code} - {location.state.blendName}
          </h3>

          <div className=" mt-2 flex gap-2 font-bold">
            <h2 className=" w-48 text-center">Code</h2>
            <h2 className=" w-48 text-center">Blend Name</h2>
          </div>
          <div className="mb-2 flex w-min gap-2 rounded-sm py-1">
            <div className="flex gap-2">
              <input
                onChange={codeInputHandler}
                value={code}
                className={`border bg-white ${
                  !error
                    ? "border-gray-300 hover:border-blue-300 focus:border-blue-500"
                    : "hover:border-bg-red-300 border-red-500 focus:border-red-600"
                }   w-48 rounded-md p-3 focus:outline-none `}
              />
              <input
                onChange={blendNameInputHandler}
                value={blendName}
                className={`border bg-white ${
                  !error
                    ? "border-gray-300 hover:border-blue-300 focus:border-blue-500"
                    : "hover:border-bg-red-300 border-red-500 focus:border-red-600"
                }   w-48 rounded-md p-3 focus:outline-none `}
              />
            </div>
          </div>

          <div className="flex flex-grow flex-col gap-2">
            <div style={{ width: "392px" }} className="flex  gap-2">
              <button
                onClick={updateHandler}
                className=" h-10 w-1/3 flex-grow justify-center rounded-sm bg-blue-700  px-1 text-white hover:bg-blue-500"
              >
                Update
              </button>

              <button
                onClick={resetClickHandler}
                className={` hover: } h-10 w-1/3 flex-grow justify-center rounded-sm  bg-zinc-300 px-1 text-black
              hover:bg-zinc-100 `}
              >
                Reset
              </button>
              <button
                onClick={deleteHandler}
                className=" h-10 w-1/3 flex-grow justify-center rounded-sm bg-red-700  px-1 text-white hover:bg-red-500"
              >
                Delete
              </button>
            </div>
            {updateRecipeCodeMutation.isSuccess && (
              <div style={{ width: "392px" }}>
                <Notification msg={`Recipe code updated!`} />
              </div>
            )}
            {errorMsg.length > 0 && (
              <div style={{ width: "392px" }}>
                <Notification msg={errorMsg} error={true} noTimeout={true} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default RecipeCode;
