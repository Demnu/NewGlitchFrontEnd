import React from "react";
import { Link } from "react-router-dom";
const CalculateButton = ({ selectedOrders, onClick }) => {
  if (selectedOrders.length <= 0) {
    return (
      <div
        disabled={true}
        className={"w-52 rounded-sm bg-gray-300 py-2 text-center text-gray-500"}
      >
        Select Orders
      </div>
    );
  } else {
    return (
      <button
        onClick={onClick}
        className={
          "w-52 rounded-sm bg-blue-700 py-2 text-center text-white hover:bg-blue-500"
        }
      >
        Calculate Orders
      </button>
    );
  }
};
export default CalculateButton;
