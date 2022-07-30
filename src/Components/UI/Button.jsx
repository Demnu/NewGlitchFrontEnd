import React from "react";

const Button = (props) => {
  return (
    <button
      disabled={props.disabled}
      onClick={props.onClick}
      className=" rounded-md bg-purple-800 text-white mt-1 w-28 h-8 hover:bg-purple-600"
    >
      {props.children}
    </button>
  );
};
export default Button;
