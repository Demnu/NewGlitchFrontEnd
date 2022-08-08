import React from "react";
const ExportButton = (props) => {
  return (
    <button
      onClick={props.onClick}
      className="bg-blue-700 hover:bg-blue-500 rounded-sm py-2 px-2 text-white text-center"
    >
      {props.children}
    </button>
  );
};
export default ExportButton;
