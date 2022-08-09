import React from "react";
const RecipeTextInput = ({ value }) => {
  return (
    <input
      className="bg-white border focus:outline-none  rounded-md p-3 w-48 "
      value={value}
    />
  );
};
export default RecipeTextInput;
