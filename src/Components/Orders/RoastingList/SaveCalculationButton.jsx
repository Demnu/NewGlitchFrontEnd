import React from "react";
import { Link } from "react-router-dom";
const SaveCalculationButton = ({ title, loading, onClick }) => {
  if (loading) {
    return (
      <div
        disabled={true}
        className={
          "bg-gray-300 text-gray-500 w-52 rounded-sm py-2  m-1 text-center"
        }
      >
        {title}
      </div>
    );
  } else {
    return (
      <button
        onClick={onClick}
        className={
          "bg-blue-700 hover:bg-blue-500 w-52 rounded-sm py-2 text-white m-1 text-center"
        }
      >
        {title}
      </button>
    );
  }
};
export default SaveCalculationButton;
