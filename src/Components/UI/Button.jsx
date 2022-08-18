import React from "react";

const Button = (props) => {
  return (
    <button
      disabled={props.disabled}
      onClick={props.onClick}
      className=" mt-1 h-8 w-28 rounded-md bg-purple-800 text-white hover:bg-purple-600"
    >
      {props.children}
    </button>
  );
};
export default Button;
