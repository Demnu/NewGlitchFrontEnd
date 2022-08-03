import React from "react";
const TablePickerButton = ({ title, rounded, border, selected, onClick }) => {
  return (
    <button
      className={`bg-yellow-400 hover:bg-yellow-500 w-3/6 py-2  text-black text-center ${rounded} ${border} ${
        selected && "bg-yellow-300 "
      } border-black`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};
export default TablePickerButton;
