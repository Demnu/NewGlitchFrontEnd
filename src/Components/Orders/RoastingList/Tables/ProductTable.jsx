import React, { useMemo, forwardRef, useState, useEffect } from "react";
import Table from "../../../UI/Table";
import { getBeansColumns } from "./ColumnData";
import { DataGrid } from "@mui/x-data-grid";
const columns = [
  { field: "id", headerName: "Product", width: 300 },
  { field: "hasRecipe", headerName: "Has Recipe", width: 100 },
  { field: "amount", headerName: "Amount", width: 150 },
];
const ProductTable = ({ products, loading }) => {
  return (
    <>
      <DataGrid
        loading={loading}
        rows={products}
        columns={columns}
        disableSelectionOnClick={true}
        density={"compact"}
      />

      {/* <Table title={"Products"} columns={columns} data={products} /> */}
    </>
  );
};
export default ProductTable;
