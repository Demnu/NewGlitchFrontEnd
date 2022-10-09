import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { createBlend, createRecipeCode } from "../../../myApi";
import Notification from "../../UI/Notification";
const NewBlend = () => {
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [code, setCode] = useState("");
  const [blendName, setBlendName] = useState("");
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

  const submitHandler = (e) => {
    e.preventDefault();
    if (blendName.trim().length == 0) {
      setError(true);
    } else {
      saveNewBlendMutation.mutate();
    }
  };

  const resetClickHandler = () => {
    setCode("");
    setBlendName("");
  };

  const saveNewBlendMutation = useMutation(
    () => {
      return createBlend({
        name: blendName.trim(),
        recipes: [],
      });
    },
    {
      onError: (e) => {
        setErrorMsg(e.response.data);
      },
      onSuccess: (e) => {
        setBlendName("");
      },
    }
  );

  return (
    <>
      <div className="restOfScreenHeight flex flex-col p-5 ">
        <div className=" flex flex-col rounded-lg bg-zinc-200">
          <h3 className=" w-96 text-center text-xl font-bold">Blend Name</h3>

          <div className=" mt-2 flex gap-2 font-bold"></div>
          <form>
            <div className="mb-2 flex w-min gap-2 rounded-sm py-1">
              <div className=" w-max">
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
            </div>

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
                  <Notification msg={`Recipe code saved!`} />
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
      </div>
    </>
  );
};
export default NewBlend;
