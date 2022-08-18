import React from "react";
const TablePickerButton = ({ title, rounded, border, selected, onClick }) => {
  return (
    <button
      className={`w-2/6 border-black bg-white py-1 text-center  text-lg  text-black hover:bg-zinc-200 ${rounded} ${border} ${
        selected && "bg bg-zinc-200   "
      }
      ${!selected && " hover:bg-slate-200"}`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};
export default TablePickerButton;
