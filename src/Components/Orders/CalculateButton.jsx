import React from "react";
import { Link } from "react-router-dom";
const CalculateButton = ({ selectedOrders, onClick }) => {
  if (selectedOrders.length <= 0) {
    return (
      <div
        disabled={true}
        className={"bg-gray-300 text-gray-500 w-52 rounded-sm py-2 text-center"}
      >
        Select Orders
      </div>
    );
  } else {
    return (
      <button
        onClick={onClick}
        className={
          "bg-blue-700 hover:bg-blue-500 w-52 rounded-sm py-2 text-white text-center"
        }
      >
        Calculate Orders
      </button>
    );
  }
};
export default CalculateButton;
