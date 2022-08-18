import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import ReactDOM from "react-dom";

const CalculationTitleAlert = ({ title, description, cancel, mutation }) => {
  const Message = () => {
    const [tempInput, setTempInput] = useState("");
    const [error, setError] = useState(false);
    const onInputChangeHandler = (event) => {
      setError("");
      setTempInput(event.target.value);
    };
    return (
      <>
        <div className="fixed top-0 left-0 z-40 h-screen w-screen bg-black opacity-50 "></div>
        <div className="flex justify-center ">
          <div className="fixed  top-40 z-50	 mx-auto flex w-80 flex-col  overflow-hidden rounded bg-white pb-2 text-black shadow-lg    ">
            <div className=" bg-zinc-800 px-3 py-1  text-center text-2xl text-slate-200">
              {title}
            </div>
            <div className="flex flex-col px-3 py-1 ">
              <p className="" key={Math.random()}>
                {description}
              </p>
              {error.length > 0 && (
                <p className="flex-none text-red-500">*{error}</p>
              )}
            </div>

            <form>
              <div className="flex px-2">
                <input
                  placeholder=""
                  autoFocus={true}
                  onChange={onInputChangeHandler}
                  type="text"
                  value={tempInput}
                  className={`flex-grow rounded-sm border border-slate-200 bg-slate-200  pl-1 hover:border-blue-400 focus:border-blue-700 focus:outline-none ${
                    error.length > 0 &&
                    "border-red-600 hover:border-red-600 focus:border-red-600"
                  } `}
                />
              </div>

              <div className="my-2 flex px-3 ">
                <button
                  type="submit"
                  onClick={(event) => {
                    event.preventDefault();

                    if (tempInput.trim().length > 0) {
                      mutation.mutate(tempInput);
                      cancel();
                    } else {
                      setTempInput("");
                      setError("Title must have at least one character");
                    }
                  }}
                  className={`} w-2/6 flex-grow rounded-sm bg-blue-700 py-1 text-center text-lg text-white
                  hover:bg-blue-500`}
                >
                  Save
                </button>
              </div>
            </form>
            <div className="my-1 flex px-3 ">
              <button
                onClick={() => {
                  cancel();
                }}
                className=" w-2/6 flex-grow rounded-sm border-black bg-gray-300 py-1  text-center text-lg text-gray-500 hover:bg-gray-200 "
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      {ReactDOM.createPortal(
        <Message />,
        document.getElementById("backdrop-root")
      )}
    </>
  );
};
export default CalculationTitleAlert;
