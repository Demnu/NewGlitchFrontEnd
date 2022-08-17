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
        className={`bg-white border ${
          !error
            ? "border-gray-300 hover:border-blue-300 focus:border-blue-500"
            : "border-red-500 hover:border-bg-red-300 focus:border-red-600"
        }   focus:outline-none rounded-md p-3 w-5/12 `}
        value={value}
      />
    </>
  );
};
export default LoginTextInput;
