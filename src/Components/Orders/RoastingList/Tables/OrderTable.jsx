import React, { useMemo, useEffect, useState } from "react";
import Table from "../../../UI/Table";
import { getOrdersColumns } from "./ColumnData";
import { DataGrid } from "@mui/x-data-grid";
const columns = [{ field: "id", headerName: "Orders", width: 50, flex: 1 }];
const OrderTable = ({ orders, loading }) => {
  const [ordersObj, setOrdersObj] = useState([]);
  useEffect(() => {
    let newOrdersObj = [];
    for (let orderID of orders) {
      newOrdersObj.push({ id: orderID });
    }
    setOrdersObj(newOrdersObj);
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
