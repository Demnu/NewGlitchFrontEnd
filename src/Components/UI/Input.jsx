import React from "react";

const Input = (props) => {
  const changeValue = (event) => {
    event.preventDefault();
    props.onChange(event.target.value);
  };

  return (
    <input
      ref={props.refVariable}
      disabled={props.disabled}
      type={props.type}
      onChange={changeValue}
      className="rounded-sm border border-zinc-600  bg-zinc-800 hover:border-purple-500 focus:border-purple-600 focus:outline-none"
      value={props.value}
    ></input>
  );
};
export default Input;
