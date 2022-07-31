import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import CalculateButton from "./CalculateButton";
import { getOrders } from "../../myApi";
import RoastingList from "./RoastingList/RoastingList";
const Orders = ({ selectLink }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [showRoastingList, setShowRoastingList] = useState(false);
  useEffect(() => {
    selectLink("Orders");
    const res = getOrders();
    res.then((result) => {
      let resultOrders = [];
      setOrders(result.data.reverse());
      setLoading(false);
    });
  }, []);

  const handleSelection = (item) => {
    setSelectedOrders(item);
  };

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
              <span key={product.id}>
                <b>{product.name}</b> <b>{product.id}</b> - {product.amount}{" "}
              </span>
            ))}
          </div>
        );
      },
    },
  ];

  const calculateOrdersOnClickHandler = () => {
    setShowRoastingList(true);
  };

  return (
    <div className=" bg-slate-100 h-screen flex flex-col  ">
      {!showRoastingList && (
        <>
          <div className=" w-auto flex justify-center">
            <CalculateButton
              onClick={calculateOrdersOnClickHandler}
              selectedOrders={selectedOrders}
            />
          </div>

          <div className=" flex-grow bg-white mx-2  ">
            <DataGrid
              loading={loading}
              rows={orders}
              columns={columns}
              checkboxSelection
              density="compact"
              onSelectionModelChange={(item) => handleSelection(item)}
            />
          </div>
        </>
      )}
      {showRoastingList && <RoastingList selectedOrders={selectedOrders} />}
    </div>
  );
};
export default Orders;
