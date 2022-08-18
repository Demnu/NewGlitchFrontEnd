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
      <div className=" rounded-md border-2 shadow-md">
        <div className="flex justify-center">
          <h1 className=" my-2 whitespace-nowrap text-xl">{title}</h1>
        </div>
        <div className="break-words ">
          <table className="table-fixed rounded-lg  ">
            <thead className=" ">
              <tr>
                {columnHeaders.map((header, index) => (
                  <th
                    className="whitespace-nowrap px-4 py-2 text-left font-medium "
                    key={index}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="overflow-y-auto ">
              {rows.map((row, index) => (
                <tr>
                  {row.map((value) => (
                    <td className=" border-b-2 border-t-2 px-4 py-2">
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default Table;
