import React from "react";
import Button from "./Button";
import ReactDOM from "react-dom";

const Alert = ({ title }) => {
  const Message = () => {
    return (
      <>
        <div className="fixed top-0 left-0 z-40 h-screen w-screen bg-black opacity-50 "></div>
        <div className="flex justify-center">
          <div className="fixed 	 top-40 z-50 mx-auto max-w-sm overflow-hidden rounded-lg bg-white text-black shadow-lg  ">
            <div className=" bg-yellow-500 px-3 py-1 text-2xl text-white">
              {title}
            </div>
            <p className="px-3 py-1" key={Math.random()}>
              Hello
            </p>
            <div className="mb-2 flex justify-end px-3">
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
