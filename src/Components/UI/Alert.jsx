import React from "react";
import Button from "./Button";
import ReactDOM from "react-dom";

const Alert = ({ title }) => {
  const Message = () => {
    return (
      <>
        <div className="z-40 fixed top-0 left-0 w-screen h-screen bg-black opacity-50 "></div>
        <div className="flex justify-center">
          <div className="z-50 	 fixed top-40 max-w-sm mx-auto rounded-lg overflow-hidden shadow-lg text-black bg-white  ">
            <div className=" px-3 py-1 bg-yellow-500 text-2xl text-white">
              {title}
            </div>
            <p className="px-3 py-1" key={Math.random()}>
              Hello
            </p>
            <div className="mb-2 px-3 flex justify-end">
              <Button className="">Okay</Button>
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
