import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { getOrders } from "../../myApi";

const Orders = ({ selectLink }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    selectLink("Orders");
    const res = getOrders();
    res.then((result) => {
      let resultOrders = [];
      setOrders(result.data.reverse());
      setLoading(false);
    });
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
      renderCell: (params) => {
        return (
          <div className="test">
            {params.row.products.map((product) => (
              <span>
                <b>{product.name}</b> <b>{product.id}</b> - {product.amount}{" "}
              </span>
            ))}
          </div>
        );
      },
    },
  ];
  return (
    <div className=" bg-slate-100 h-screen flex flex-col ">
      <div className="flex justify-center">
        <button className=" w-4/6 rounded-md bg-blue-700 py-2 text-white m-1 hover:bg-blue-500 ">
          Calculate Orders
        </button>
      </div>

      <div className=" flex-grow bg-white mx-2  ">
        <DataGrid
          loading={loading}
          rows={orders}
          columns={columns}
          checkboxSelection
          density="compact"
        />
      </div>
    </div>
  );
};
export default Orders;
