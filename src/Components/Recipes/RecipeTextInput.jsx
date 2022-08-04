import React from "react";
const RecipeTextInput = ({ value }) => {
  return (
    <input
      className=" bg-white border focus:outline-none  rounded-md px-1 w-40 "
      value={value}
    />
  );
};
export default RecipeTextInput;
