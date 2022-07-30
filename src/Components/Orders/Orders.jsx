import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "../UI/Button";
const Orders = ({ selectLink }) => {
  useEffect(() => {
    selectLink("Orders");
  }, []);
  const rows = [
    { id: Math.random(), customerName: "test", date: new Date() },
    { id: Math.random(), customerName: "test", date: new Date() },
    { id: Math.random(), customerName: "test", date: new Date() },
    { id: Math.random(), customerName: "test", date: new Date() },
    { id: Math.random(), customerName: "test", date: new Date() },
    { id: Math.random(), customerName: "test", date: new Date() },
    { id: Math.random(), customerName: "test", date: new Date() },
    { id: Math.random(), customerName: "test", date: new Date() },
    { id: Math.random(), customerName: "test", date: new Date() },
    { id: Math.random(), customerName: "test", date: new Date() },
    { id: Math.random(), customerName: "test", date: new Date() },
    { id: Math.random(), customerName: "test", date: new Date() },
    { id: Math.random(), customerName: "test", date: new Date() },
    { id: Math.random(), customerName: "test", date: new Date() },
    { id: Math.random(), customerName: "test", date: new Date() },
    { id: Math.random(), customerName: "test", date: new Date() },
    { id: Math.random(), customerName: "test", date: new Date() },
    { id: Math.random(), customerName: "test", date: new Date() },
    { id: Math.random(), customerName: "test", date: new Date() },
    { id: Math.random(), customerName: "test", date: new Date() },
    { id: Math.random(), customerName: "test", date: new Date() },
    { id: Math.random(), customerName: "test", date: new Date() },
    { id: Math.random(), customerName: "test", date: new Date() },
    { id: Math.random(), customerName: "test", date: new Date() },
    { id: Math.random(), customerName: "test", date: new Date() },
    { id: Math.random(), customerName: "test", date: new Date() },
    { id: Math.random(), customerName: "test", date: new Date() },
    { id: Math.random(), customerName: "test", date: new Date() },
    { id: Math.random(), customerName: "test", date: new Date() },
    { id: Math.random(), customerName: "test", date: new Date() },
    { id: Math.random(), customerName: "test", date: new Date() },
    { id: Math.random(), customerName: "test", date: new Date() },
    { id: Math.random(), customerName: "test", date: new Date() },
    { id: Math.random(), customerName: "test", date: new Date() },
    { id: Math.random(), customerName: "test", date: new Date() },
    { id: Math.random(), customerName: "test", date: new Date() },
    { id: Math.random(), customerName: "test", date: new Date() },
  ];
  const columns = [
    { field: "id", headerName: "Order ID", width: 90 },

    {
      field: "customerName",
      headerName: "Customer",
      width: 150,
    },
    {
      field: "date",
      headerName: "Order Date",
      width: 120,
    },
    {
      field: "supplierName",
      headerName: "Supplier",
      width: 150,
    },
    {
      field: "products",
      headerName: "Products",
      width: 3000,
    },
  ];
  return (
    <div className=" bg-slate-100 h-screen flex flex-col ">
      <div className="flex justify-center">
        <button className=" w-5/6 rounded-md bg-blue-800 py-2 text-white m-1 hover:bg-blue-600 ">
          Calculate Orders
        </button>
      </div>

      <div className=" flex-grow mx-5 bg-white">
        <DataGrid
          rows={rows}
          columns={columns}
          checkboxSelection
          density="compact"
        />
      </div>
    </div>
  );
};
export default Orders;
