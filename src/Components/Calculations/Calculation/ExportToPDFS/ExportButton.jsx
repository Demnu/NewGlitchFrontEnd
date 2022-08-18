import React from "react";
const ExportButton = (props) => {
  return (
    <button
      onClick={props.onClick}
      className="rounded-sm bg-blue-700 py-2 px-2 text-center text-white hover:bg-blue-500"
    >
      {props.children}
    </button>
  );
};
export default ExportButton;
