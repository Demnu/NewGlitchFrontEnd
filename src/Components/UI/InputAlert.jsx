import React, { useState } from "react";
import Button from "./Button";
import ReactDOM from "react-dom";

const InputAlert = ({ title, description, cancel, setInput }) => {
  const Message = () => {
    const [tempInput, setTempInput] = useState("");
    const [error, setError] = useState(false);
    const onInputChangeHandler = (event) => {
      setError("");
      setTempInput(event.target.value);
    };

    return (
      <>
        <div className="z-40 fixed top-0 left-0 w-screen h-screen bg-black opacity-50 "></div>
        <div className="flex justify-center ">
          <div className="z-50  flex flex-col	 fixed top-40 w-80 mx-auto  rounded overflow-hidden shadow-lg text-black bg-white pb-2    ">
            <div className=" px-3 py-1 bg-zinc-800  text-2xl text-slate-200 text-center">
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
                  className={`flex-grow border border-slate-200 rounded-sm pl-1  focus:outline-none focus:border-blue-700 hover:border-blue-400 bg-slate-200 ${
                    error.length > 0 &&
                    "border-red-600 hover:border-red-600 focus:border-red-600"
                  } `}
                />
              </div>

              <div className="my-2 px-3 flex ">
                <button
                  type="submit"
                  onClick={(event) => {
                    event.preventDefault();

                    if (tempInput.trim().length > 0) {
                      setInput(tempInput);
                      cancel();
                    } else {
                      setTempInput("");
                      setError("Title must have at least one character");
                    }
                  }}
                  className={`flex-grow bg-blue-700 hover:bg-blue-500 w-2/6 py-1 text-white text-center text-lg rounded-sm
                  }`}
                >
                  Save
                </button>
              </div>
            </form>
            <div className="my-1 px-3 flex ">
              <button
                onClick={() => {
                  cancel();
                }}
                className=" flex-grow bg-gray-300 text-gray-500 hover:bg-gray-200 w-2/6 py-1  text-center text-lg border-black rounded-sm "
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
export default InputAlert;
