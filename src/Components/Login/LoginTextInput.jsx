import React from "react";
import { logo } from "./logo.png";
const LoginTextInput = ({
  id,
  value,
  onChange,
  type,
  error,
  label,
  autofocus,
}) => {
  return (
    <>
      <label>{label}</label>
      <input
        autoFocus={autofocus}
        type={type}
        onChange={(e) => onChange(e, id)}
        className={`border bg-white ${
          !error
            ? "border-gray-300 hover:border-blue-300 focus:border-blue-500"
            : "hover:border-bg-red-300 border-red-500 focus:border-red-600"
        }   w-5/12 rounded-md p-3 focus:outline-none `}
        value={value}
      />
    </>
  );
};
export default LoginTextInput;
