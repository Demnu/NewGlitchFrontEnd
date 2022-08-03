import React, { useState } from "react";
import Button from "./Button";
import ReactDOM from "react-dom";

const InputAlert = ({ title, description, cancel, setInput }) => {
  const Message = () => {
    const [tempInput, setTempInput] = useState("");
    const onInputChangeHandler = (event) => {
      setTempInput(event.target.value);
    };

    return (
      <>
        <div className="z-40 fixed top-0 left-0 w-screen h-screen bg-black opacity-50 "></div>
        <div className="flex justify-center">
          <div className="z-50 	 fixed top-40 max-w-lg mx-auto rounded-lg overflow-hidden shadow-lg text-black bg-white  ">
            <div className=" px-3 py-1 bg-zinc-700  text-2xl text-white text-center">
              {title}
            </div>
            <p className="px-3 py-1" key={Math.random()}>
              {description}
            </p>
            <form>
              <div className="flex px-2">
                <input
                  autoFocus={true}
                  onChange={onInputChangeHandler}
                  type="text"
                  value={tempInput}
                  className=" flex-grow border border-slate-200 rounded-sm pl-1  focus:outline-none focus:border-blue-700 hover:border-yellow-500 bg-slate-200 "
                />
              </div>

              <div className="my-2 px-3 flex ">
                <button
                  type="submit"
                  onClick={(event) => {
                    event.preventDefault();
                    setInput(tempInput);
                    cancel();
                  }}
                  className=" flex-grow bg-blue-700 hover:bg-blue-500 w-2/6 py-1   text-white text-center text-lg border-black rounded-md "
                >
                  Save
                </button>
              </div>
            </form>
            <div className="my-2 px-3 flex ">
              <button
                onClick={() => {
                  cancel();
                }}
                className=" flex-grow bg-gray-300 text-gray-500 hover:bg-gray-200 w-2/6 py-1  text-center text-lg border-black rounded-md "
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
