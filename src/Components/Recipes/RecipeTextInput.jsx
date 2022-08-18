import React from "react";
const RecipeTextInput = ({ id, value, onChange, type, error }) => {
  return (
    <input
      type={type}
      onChange={(e) => onChange(e, id)}
      className={`border bg-white ${
        !error
          ? "border-gray-300 hover:border-blue-300 focus:border-blue-500"
          : "hover:border-bg-red-300 border-red-500 focus:border-red-600"
      }   w-48 rounded-md p-3 focus:outline-none `}
      value={value}
    />
  );
};
export default RecipeTextInput;
