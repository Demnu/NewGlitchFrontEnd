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
      className="border border-zinc-600 rounded-sm  focus:outline-none focus:border-purple-600 hover:border-purple-500 bg-zinc-800"
      value={props.value}
    ></input>
  );
};
export default Input;
