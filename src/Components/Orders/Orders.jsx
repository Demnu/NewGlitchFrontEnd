import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import CalculateButton from "./CalculateButton";
import { getOrders } from "../../myApi";
import RoastingList from "./RoastingList/RoastingList";
import { useQuery } from "@tanstack/react-query";
const Orders = ({ selectLink }) => {
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [showRoastingList, setShowRoastingList] = useState(false);
  const { isLoading, data } = useQuery(["orders"], getOrders);

  useEffect(() => {
    selectLink("Orders");
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
    <div className="restOfScreenHeight flex flex-col mx-2">
      <div
        className={` flex-grow flex flex-col ${showRoastingList && "hidden"}`}
      >
        <div className=" my-2 flex">
          <CalculateButton
            onClick={calculateOrdersOnClickHandler}
            selectedOrders={selectedOrders}
          />
        </div>
        <div className=" flex-grow bg-white ≈ rounded-sm mb-2 ">
          <DataGrid
            loading={isLoading}
            rows={data?.data || []}
            columns={columns}
            checkboxSelection
            density="compact"
            onSelectionModelChange={(item) => handleSelection(item)}
          />
        </div>
      </div>
      <div
        className={`${!showRoastingList && " hidden"} h-screen flex flex-col`}
      >
        {showRoastingList && (
          <RoastingList
            selectedOrders={selectedOrders}
            setShowRoastingList={setShowRoastingList}
          />
        )}
      </div>
    </div>
  );
};
export default Orders;
