import React, { useMemo, forwardRef, useEffect } from "react";
import Table from "../../../UI/Table";
import { DataGrid } from "@mui/x-data-grid";
import { getBeansColumns } from "./ColumnData";
import { useState } from "react";
const columns = [
  { field: "id", headerName: "Bean", width: 200 },
  { field: "amount", headerName: "Amount (kg)", width: 150 },
];
const BeanTable = ({ beans, loading }) => {
  let beansArray = beans;
  let newBeansArray = [];
  for (let bean of beansArray) {
    let newBeanAmount = bean.amount.toFixed(2);
    newBeansArray.push({ id: bean.name || bean.id, amount: newBeanAmount });
  }

  // const columns = useMemo(() => getBeansColumns(), []);

  return (
    <>
      <DataGrid
        loading={loading}
        rows={newBeansArray}
        columns={columns}
        disableSelectionOnClick={true}
        density={"compact"}
      />
      {/* <Table title={"Roasting List"} columns={columns} data={beans} /> */}
    </>
  );
};
export default BeanTable;
