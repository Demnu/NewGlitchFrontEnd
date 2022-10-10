import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import CalculateButton from "./CalculateButton";
import { getOrders, updateOrder } from "../../myApi";
import RoastingList from "./RoastingList/RoastingList";
import { useMutation, useQuery } from "@tanstack/react-query";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
const Orders = ({ selectLink }) => {
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [showRoastingList, setShowRoastingList] = useState(false);
  const { isLoading, data } = useQuery(["orders"], getOrders, {
    refetchOnWindowFocus: false,
    refetchInterval: 300000,
  });

  let orders = [];
  if (data) {
    orders = [...data?.data].reverse();
  }
  useEffect(() => {
    selectLink("Orders");
  }, []);

  const handleSelection = (item) => {
    setSelectedOrders(item);
  };

  const updateLastOrderMutation = useMutation((params) => {
    return updateOrder(params);
  });

  const columns = [
    {
      field: "lastOrder",
      headerName: <StarOutlineRoundedIcon />,
      width: 50,
      renderCell: (params) => {
        return (
          <button
            className=" flex h-full w-full items-center  "
            onClick={(e) => {
              params.row.lastOrder = !params.row.lastOrder;
              updateLastOrderMutation.mutate({
                id: params.row.id,
                lastOrder: params.row.lastOrder,
              });
            }}
          >
            {params.row.lastOrder == true && <StarRoundedIcon />}
          </button>
        );
      },
    },

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
    <div className="restOfScreenHeight mx-2 flex flex-col">
      <div
        className={` flex flex-grow flex-col ${showRoastingList && "hidden"}`}
      >
        <div className=" my-2 flex">
          <CalculateButton
            onClick={calculateOrdersOnClickHandler}
            selectedOrders={selectedOrders}
          />
        </div>
        <div className=" ≈ mb-2 flex-grow rounded-sm bg-white ">
          <DataGrid
            loading={isLoading}
            rows={orders}
            columns={columns}
            checkboxSelection
            disableSelectionOnClick
            density="compact"
            onSelectionModelChange={(item) => handleSelection(item)}
          />
        </div>
      </div>
      <div
        className={`${!showRoastingList && " hidden"} flex h-screen flex-col`}
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
