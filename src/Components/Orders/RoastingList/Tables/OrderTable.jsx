import React, { useMemo, useEffect, useState } from "react";
import Table from "../../../UI/Table";
import { getOrdersColumns } from "./ColumnData";
import { DataGrid } from "@mui/x-data-grid";
const columns = [{ field: "id", headerName: "Order ID's", width: 50, flex: 1 }];
const OrderTable = ({ orders, loading }) => {
  const [ordersObj, setOrdersObj] = useState([]);
  useEffect(() => {
    console.log(orders);
    let hasId = false;
    let newOrdersObj = [];

    for (let orderID of orders) {
      if (orderID.id) {
        hasId = true;
      }
      newOrdersObj.push({ id: orderID });
    }
    if (hasId) {
      setOrdersObj(orders);
    } else {
      setOrdersObj(newOrdersObj);
    }
  }, []);

  return (
    <>
      {ordersObj.length > 0 && (
        <DataGrid
          rows={ordersObj}
          columns={columns}
          disableSelectionOnClick={true}
          rowsPerPageOptions={[]}
          density={"compact"}
        />
      )}
    </>
  );
};
export default OrderTable;
