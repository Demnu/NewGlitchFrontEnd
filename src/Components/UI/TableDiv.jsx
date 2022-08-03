import { type } from "@testing-library/user-event/dist/type";
import React from "react";
function typeOf(obj) {
  return {}.toString.call(obj).split(" ")[1].slice(0, -1).toLowerCase();
}
const Table = ({ columns, data, title }) => {
  let rows = [];
  let columnHeaders = [];
  let columnAccessors = [];
  for (let column of columns) {
    columnHeaders.push(column.header);
    columnAccessors.push(column.accessor);
  }
  for (let row of data) {
    const rowArray = Object.entries(row);
    let rowValues = [];
    for (let value of rowArray) {
      if (!isNaN(value[1])) {
        rowValues.push(value[1].toFixed(2));
      } else {
        rowValues.push(value[1]);
      }
    }
    rows.push(rowValues);
  }

  return (
    <>
      <div className=" border-2 rounded-md shadow-md">
        <div className="flex justify-center">
          <h1 className=" my-2 text-xl whitespace-nowrap">{title}</h1>
        </div>
        <div className="flex flex-col h-48 ">
          {/* tableheaders */}
          <div>
            {columnHeaders.map((header, index) => (
              <th
                className="px-4 py-2 font-medium text-left whitespace-nowrap "
                key={index}
              >
                {header}
              </th>
            ))}
          </div>

          <div className="overflow-y-auto flex-grow">
            {rows.map((row, index) => (
              <tr>
                {row.map((value) => (
                  <td className=" border-b-2  px-4 py-2">{value}</td>
                ))}
              </tr>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default Table;
