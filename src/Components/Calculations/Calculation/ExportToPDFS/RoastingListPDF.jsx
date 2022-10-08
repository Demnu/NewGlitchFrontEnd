import React from "react";
import ExportButton from "./ExportButton";
const RoastingListPDF = (props) => {
  return (
    <div>
      {props.isCalculated ? (
        <ExportButton className="">Export Roasting List</ExportButton>
      ) : (
        <div
          className={`rounded-sm bg-gray-300 py-2 px-2 text-center text-gray-500`}
        >
          {" "}
          Roasting List
        </div>
      )}
    </div>
  );
};
export default RoastingListPDF;
