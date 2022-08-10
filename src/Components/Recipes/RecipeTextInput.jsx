import React from "react";
const RecipeTextInput = ({ value }) => {
  return (
    <input
      className="bg-white border hover:border-blue-300 focus:border-blue-500 border-gray-300 focus:outline-none rounded-md p-3 w-48 "
      value={value}
    />
  );
};
export default RecipeTextInput;
