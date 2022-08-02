import React, { useMemo, useEffect, useState } from "react";
import Table from "../../../UI/Table";
import { getOrdersColumns } from "./ColumnData";

const OrderTable = ({ orders }) => {
  const columns = useMemo(() => getOrdersColumns(), []);
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
        <Table title={"Orders"} columns={columns} data={ordersObj} />
      )}
    </>
  );
};
export default OrderTable;
