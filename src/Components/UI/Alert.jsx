import React from "react";
import Button from "./Button";
import ReactDOM from "react-dom";

const Alert = (props) => {
  const hideAlert = () => {
    props.setErrorMsgs([]);
  };

  const Message = () => {
    return (
      <>
        <div className="z-40 fixed top-0 left-0 w-screen h-screen bg-black opacity-50 "></div>
        <div className="flex justify-center">
          <div className="z-50 animate-bounce	 fixed top-40 max-w-sm mx-auto rounded-lg overflow-hidden shadow-lg text-white bg-zinc-800  ">
            <div className=" px-3 py-1 bg-purple-800 text-2xl text-white">
              {props.errorTitle}
            </div>
            {props.errorMsgs.map((error) => (
              <p className="px-3 py-1" key={Math.random()}>
                {error}
              </p>
            ))}
            <div className="mb-2 px-3 flex justify-end">
              <Button onClick={hideAlert} className="">
                Okay
              </Button>
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
export default Alert;
