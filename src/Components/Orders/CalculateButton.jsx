import React from "react";
import { Link } from "react-router-dom";
const CalculateButton = ({ selectedOrders }) => {
  if (selectedOrders <= 0) {
    return (
      <div
        disabled={true}
        className={
          "bg-gray-300 text-gray-500 w-4/6 rounded-md py-2  m-1 text-center"
        }
      >
        Select Orders
      </div>
    );
  } else {
    return (
      <Link
        to={"/roastingList"}
        className={
          "bg-blue-700 hover:bg-blue-500 w-4/6 rounded-md py-2 text-white m-1 text-center"
        }
      >
        Calculate Orders
      </Link>
    );
  }
};
export default CalculateButton;
